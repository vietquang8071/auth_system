import passport from 'passport'

export const passportLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log('User not found')
      return res.status(401).send({message: info.message})
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.status(200).send({message: "Login successfully", user: user})
    })
  })(req, res, next);
}

export const requireRole = (role) => {
  return (req, res, next) => {
    if (role === 'admin' || (req.user && req.user.role === role)) {
      return next()
    }
    return res.status(403).send({message: 'Forbidden'})
  }
}

export const isLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  return next()
}