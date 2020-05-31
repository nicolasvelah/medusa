import bcrypt from 'bcryptjs';
import db from '../models';

const User = db.user;

const seedUser = async (): Promise<void> => {
  try {
    User.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        try {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync('12345', salt);
          new User({
            username: 'nicolasvelah',
            email: 'nicolasvelah@gmail.com',
            password: hash,
          }).save(() => {
            if (err) {
              console.log('error', err);
            }
            console.log('added user nicolasvelah');
          });
        } catch (error) {
          console.log('Error seed user:', error.message);
        }
      }
    });
  } catch (error) {
    console.log('Error seed user:', error.message);
  }
};
export default seedUser;
