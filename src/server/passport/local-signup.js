import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
import dbConenction from '../dbConnection'
import jwt from 'jsonwebtoken'

const signup = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    username: email.trim(),
    password: password.trim()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      dbConenction.Auth().insertOne({
        username: user.username,
        password: user.password
      }, (err) => {
        if (err) console.log(err)
        const payload = {
          sub: user._id
        }
        const token = jwt.sign(payload, 'just another secret');
        const data = {
          username: user.username,
          id_token: token
        }
        return done(null, data)
      })
    })
  })
})

export default signup