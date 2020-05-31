import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token as string;
    if (!token) {
      throw new Error('missing header param "x-access-token"');
    }
    const data: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('data', data);
    //req.data = data;
    next();
  } catch (e) {
    console.log('Error verifyToken', e.message);
    res.status(403).send({ message: e.message });
  }
};

const authJwt = {
  verifyToken
};
export default authJwt;
