import {validationResult, body, matchedData } from "express-validator"
import { users } from "../data/users.js"
import { hashing, isMatched } from "../utils/hash.js"
import { passportLogin } from "../middlewares/auth.js";
import '../strategies/local-strategy.js';
import { Router } from "express";

const router = Router()

router.post('/register',[
  body('username').notEmpty().withMessage("Username cannot be empty!"), 
  body('password').notEmpty().withMessage('Password cannot be empty!').isLength({min: 8}).withMessage('Password is at least 8 character!'),
  body('email').notEmpty().withMessage('Email cannot be empty!').isEmail().withMessage('Invalid Email!')
],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({errors: errors.array()})
    }
    const newData = matchedData(req)
    const newUser = {id: users[users.length - 1].id + 1,
                     passwordHash: await hashing(newData.password),
                     creatAt: new Date(),
                     role: 'user',
                     ...newData
                    }
    users.push(newUser);
    return res.status(200).send({message: 'Register successfully',
                                data: newUser});
})

router.post('/login',[
  body('email').notEmpty().withMessage('Email cannot be empty!').isEmail().withMessage('Invalid email!'),
  body('password').notEmpty().withMessage('Password cannot be empty!')
],
  (req, res, next) => {
    const errorsResult = validationResult(req)
    if (!errorsResult.isEmpty()) {
      return res.status(400).send({errors: errorsResult.array()})
    }
  passportLogin(req, res, next);
    
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({message: 'Logout failed', error: err})
    }
    res.clearCookie('connect.sid')
    return res.status(200).send({message: "Logout successfully"})
  })
})

export default router;