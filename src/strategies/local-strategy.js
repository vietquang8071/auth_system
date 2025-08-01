import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../data/users.js";
import { isMatched } from "../utils/hash.js";

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  try {
    const findUser = users.find(user => user.id === id);
    if (!findUser) {
      return done(null, false, {message: 'User not found'})
    }
    done(null, findUser)
  } catch (error) {
    done(error, null)
  }
})

export default passport.use(
  new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const findUser = users.find(user => user.email === email);
      if (!findUser) {
        console.log('Not found!')
        return done(null, false, {message: "User not found"});
      }
      const matched = await isMatched(password, findUser.passwordHash);
      if (!matched) {
        return done(null, false, {message: "Incorrect password"})
      }
      return done(null, findUser);
    } catch (error) {
      done(error, null)
    }
  })
)