import { Request, Response, NextFunction } from 'express';
import Crypto from '../utils/crypto';
import db from '../models';

const { ROLES } = db;
const User = db.user;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const checkDuplicateUsernameOrEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body) {
      const crypto: Crypto = new Crypto();
      const body = crypto.decrypt(req.body.data, true);
      User.findOne({
        username: body.username
      }).exec((err, user) => {
        try {
          if (err) {
            throw err;
          }

          if (user) {
            throw new Error('Failed! Username is already in use!');
          }

          // Email
          if (body) {
            User.findOne({
              email: body.email
            }).exec((error, usermail) => {
              try {
                if (error) {
                  throw error;
                }

                if (usermail) {
                  throw new Error('Failed! Email is already in use!');
                }

                // Phone
                if (body) {
                  User.findOne({
                    phone: body.phone
                  }).exec((error2, userphone) => {
                    try {
                      if (error2) {
                        throw error2;
                      }

                      if (userphone) {
                        throw new Error('Failed! Phone is already in use!');
                      }

                      next();
                    } catch (e) {
                      console.log('--------Error de preexistencia:', e);
                      res.status(400).send({ message: e.message });
                    }
                  });
                }
              } catch (e) {
                console.log('--------Error de preexistencia:', e);
                res.status(400).send({ message: e.message });
              }
            });
          }
        } catch (e) {
          console.log('--------Error de preexistencia:', e);
          res.status(400).send({ message: e.message });
        }
      });
    }
  } catch (error) {
    console.log('--------Error seed role:', error);
    res.status(500).send({ message: error.message });
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body) {
      if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
          if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
              message: `Failed! Role ${req.body.roles[i]} does not exist!`
            });
            return;
          }
        }
      }
    }
  } catch (err) {
    console.log('Error', err);
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

// eslint-disable-next-line import/prefer-default-export
export default verifySignUp;
