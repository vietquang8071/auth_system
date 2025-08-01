import { Router } from "express";
import { requireRole, isLogin } from "../middlewares/auth.js";
import { users } from "../data/users.js";
import { body, validationResult } from "express-validator";
import { hashing } from "../utils/hash.js";
const router = Router()

router.get('/admin/dashboard',isLogin, requireRole('admin'), (req, res) => {
  if (req.user) {
    console.log(req.user)
  } else {
    console.log('No user')
  }
  
  return res.status(200).send({message: 'Access dashboard as an admin successfully',
    data: {
      numberOfUser: users.length,
      revenueAnually: '100000$'
    }
  })
})


router.get('/admin/users',isLogin, requireRole('admin'), (req, res) => {
  return res.status(200).send({message: 'Access list of user as an admin successfully',
    data: users
  }
  )
})

router.patch('/admin/user/:id',[
  body('password').optional().isLength({min: 8}).withMessage('Password must be at least 8 character.'),
  body('email').optional().isEmail().withMessage('Invalid email address')
], isLogin, requireRole('admin'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({message: 'Bad request', errors: errors.array()})
  }
  const userId = req.params.id
  const {username, email, password, role} = req.body;
  console.log(password)
  const user = users.find(u => u.id === userId)
  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }

  if (username) {
    user.username = req.user.username
  }

  if (password) {
    user.passwordHash = await hashing(password)
  }

  if (email) {
    user.email = req.user.email
  }

  if (role) {
    user.role = role
  }

  console.log(user)

  return res.status(200).send({message: 'Change profile successfully'})
})
export default router