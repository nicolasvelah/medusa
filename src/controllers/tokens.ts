import _ from 'lodash';
import jwt from 'jsonwebtoken';
import Token, { IToken } from '../models/token.model';

const refresh = async (token: string) => {
  const registeredToken: IToken | null = await Token.findOne({ token });
  if (!registeredToken) {
    const error = new Error('Token inválido.');
    throw error;
  }

  const { payload } = registeredToken;

  const newToken: string = await jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.EXPIRES_IN
  });

  registeredToken.token = newToken;
  await registeredToken.save();
  return {
    token: newToken,
    expiresIn: process.env.EXPIRES_IN
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const register = async (token: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const data: Object = jwt.verify(token, process.env.JWT_SECRET!);
  const payload = _.omit(data, ['iat', 'exp']);

  await new Token({
    payload,
    token
  }).save();
};

export { register, refresh };
