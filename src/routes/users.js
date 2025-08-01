import { Router } from "express";
import { requireRole, isLogin } from "../middlewares/auth.js";
import { body, validationResult } from "express-validator";
import { users } from "../data/users.js";
import { hashing } from "../utils/hash.js";
const router = Router()


router.get('/user/profile', isLogin, (req, res) => {
  const user = req.user;
  return res.status(200).send({message: 'Access information successfully',
    data: user
  })
})

router.patch('/user/profile',[
  body('password').optional().isLength({min: 8}).withMessage('Password must be at least 8 character.'),
  body('email').optional().isEmail().withMessage('Invalid email address')
], isLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({message: 'Bad request', errors: errors.array()})
  }

  const userId = req.user.id

  const user = users.find(u => u.id === userId)
  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }

  if (req.user.username) {
    user.username = req.user.username
  }

  if (req.user.password) {
    user.passwordHash = await hashing(req.user.password)
  }

  if (req.user.email) {
    user.email = req.user.email
  }
  return res.status(200).send({message: 'Change profile successfully'})
})

export default router