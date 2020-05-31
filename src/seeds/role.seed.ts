import db from '../models';

const Role = db.role;

const seedRole = async (): Promise<void> => {
  try {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: 'user'
        }).save(() => {
          if (err) {
            console.log('error', err);
          }
          console.log('added user to roles collection');
        });
        new Role({
          name: 'moderator'
        }).save(() => {
          if (err) {
            console.log('error', err);
          }
          console.log('added moderator to roles collection');
        });
        new Role({
          name: 'admin'
        }).save(() => {
          if (err) {
            console.log('error', err);
          }
          console.log('added admin to roles collection');
        });
      }
    });
  } catch (error) {
    console.log('Error seed role:', error.message);
  }
};
export default seedRole;
