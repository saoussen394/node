const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express')


const router = express.Router()
// routes/router.js
var db = require("../config/db.config");

router.post('/login', (req, res, next) => {
 const cin = req.body.cin;
  db.query(
    `SELECT * FROM employees WHERE cin=?;`,cin,
    (err, result) => {

        next
      // user does not exists
      if (err) {
       
        return res.status(400).send({
          msg: err
        });
      }

      if (result.length <1 ) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
           
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }

          if (bResult) {
            const token = jwt.sign({
                cin: result[0].cin,
                email: result[0].email
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );

           
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});

module.exports = router