import bcrypt from "bcrypt";
function createHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(8)
      .then((salt) => {
        bcrypt
          .hash(password, salt)
          .then((hash) => {
            resolve(hash);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default createHash;
