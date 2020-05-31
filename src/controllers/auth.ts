import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Crypto from '../utils/crypto';
import db from '../models';
import { register, refresh } from './tokens';

const User = db.user;
const Role = db.role;

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const crypto: Crypto = new Crypto();
    const body = crypto.decrypt(req.body.data, true);

    Role.findOne({
      name: 'user'
    }).exec((err, role) => {
      console.log('Role------', role);
      const {
        username,
        email,
        password,
        phone,
        birthday,
        homeaddress,
        busnessaddress,
        economicsituation
      } = body;

      if (role) {
        try {
          new User({
            username,
            email,
            password: bcrypt.hashSync(password, 8),
            phone,
            birthday,
            homeaddress,
            busnessaddress,
            economicsituation,
            roles: [role._id]
          }).save(async (error, user) => {
            if (error) {
              console.log('error', error);
            }
            console.log('added user', user);
            const token = await jwt.sign(
              {
                id: user._id
              },
              process.env.JWT_SECRET!,
              {
                expiresIn: process.env.EXPIRES_IN
              }
            );
            await register(token as string);
            console.log('Registro el token.');
            res.status(200).send({ token, expiresIn: process.env.EXPIRES_IN });
          });
        } catch (error) {
          console.log('added user error.message', error.message);
          res.status(500).send({
            error: error.message,
            message: 'No se pudo añadir el usuario intente más tarde.'
          });
        }
      }
    });
  } catch (error) {
    console.log('error al decriptar o el usuario ya exite', error.message);
    res
      .status(500)
      .send({ error: error.message, message: 'El usuario ya exite.' });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: any = req.body;
    const crypto: Crypto = new Crypto();

    console.log('body.data', data.data);

    const body = crypto.decrypt(data.data, true);
    let resp: any = null;
    // eslint-disable-next-line consistent-return
    console.log('body.email', body.email);
    await User.findOne(
      { email: body.email },
      ['id', 'password'],
      // eslint-disable-next-line consistent-return
      async (err: any, user: any) => {
        if (user) {
          const passwordIsValid = await bcrypt.compareSync(
            body.password,
            user.password
          );
          console.log('body.email', body.password);
          console.log('passwordIsValid', passwordIsValid);
          if (!passwordIsValid) {
            return res
              .status(401)
              .send({ error: 'usuario o password incorrecto.', message: 'usuario o password incorrecto.' });
          }
          try {
            const token = await jwt.sign(
              {
                id: user._id
              },
              process.env.JWT_SECRET!,
              {
                expiresIn: process.env.EXPIRES_IN
              }
            );
            await register(token as string);
            console.log('Registro el token.');
            resp = { token, expiresIn: process.env.EXPIRES_IN };
            res.status(200).send(resp);
          } catch (error) {
            console.error(error);
            resp = { errors: true };
            res
              .status(500)
              .send({
                error: 'usuario o password incorrecto',
                message: 'usuario o password incorrecto.'
              });
          }
        } else {
          console.log('usuario no encontrado.');
          res
            .status(500)
            .send({ error: err, message: 'usuario no encontrado.' });
        }
      }
    );
  } catch (error) {
    console.log('Error login:', error.message);
    res
      .status(500)
      .send({ error: error.message, message: 'usuario no encontrado.' });
  }
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string = req.headers.token as string;
    if (!token) {
      res.status(403).send('missing header token');
    }
    const data = await refresh(token);
    res.send(data);
  } catch (error) {
    console.log('refresh-tokens register error:', error);
    res.status(500).send(error.message);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { login, signup, refreshToken };
