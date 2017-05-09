var bcrypt = require('bcryptjs');

module.exports = {
// No need to store the salt because the hash includes it at the beginning
// Salt is added at beginning to hash like $2a$10$CVKM/Y5YTdSih615f70aUe
// Hash would be $2a$10$CVKM/Y5YTdSih615f70aUeqiAJ0EV0PyohI8700T6GwlBjYQpQgBy
  createHashPassword : (plainTextPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(plainTextPassword, salt).then((hash) => {
        // console.log('Store hash as password:', hash);
        callback(null, hash);
      }).catch((err) => {
        callback(err, null);
      });
    });
  },

  checkHashPassword : (plainTextPassword, hash, callback) => {
    bcrypt.compare(plainTextPassword, hash).then((value) => {
      // console.log(value === true);
      callback(null, value);
    }).catch((err) => {
      callback(err, null);
    });
  }

};


// CALL SERVICE ON THE SERVER (EXAMPLE BELOW)
// Remember to require this as a library and adjust the code below as necessary

// var plainTextPassword = 'nick123';
// createHashPassword(plainTextPassword, (err, hash) => {
//   if (err) throw err;
//   console.log('plainTextPassword:', plainTextPassword);
//   console.log('hash:', hash);
//   checkHashPassword(plainTextPassword, hash, (err, value) => {
//     if (err) throw err;
//     console.log('password and hash match? true/false:', value === true);
//   });
// });

