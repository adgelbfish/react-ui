import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'
import dbConnection from '../dbConnection'
import jwt from 'jsonwebtoken'

const login = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const user = {
    username: username.trim(),
    password: password.trim()
  }

  dbConnection.Auth().findOne({ username: user.username }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) return done(err)
      if (isMatch) {
        const payload = {
          sub: user._id
        }
        const token = jwt.sign(payload, 'just another secret');
        const data = {
          username: user.username,
          id_token: token
        }
        return done(null, data)
      }
      return done(null, false, {message: 'Incorrect password'})
    });
  })

})

export default login