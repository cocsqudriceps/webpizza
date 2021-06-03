import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import { check, validationResult } from 'express-validator'
import User from '../models/User'

const authRouter = Router()

authRouter.post(
  '/register',
  check('email', 'Email is not valid!').isEmail(),
  check('password', 'Password should be more than 5 symbols!').isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
        })
        return
      }

      const { email, password, FirstName, LastName } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        res
          .status(400)
          .json({ message: ['User with this email already exist!'] })
        return
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email,
        password: hashedPassword,
        FirstName,
        LastName,
      })

      await user.save()

      res.status(201).json({ message: 'User created!' })
    } catch (e) {
      res.status(500).json({
        message: 'Something went wrong in register route! Try again!',
      })
    }
  }
)
authRouter.post(
  '/login',
  check('email', 'Email is not valid!').normalizeEmail().isEmail(),
  check('password', 'Password field cant be empty!').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
        })
        return
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        res.status(400).json({ message: "User with this email wasn't found" })
        return
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.status(400).json({ message: "The password isn't correct!" })
        return
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwt'), {
        expiresIn: '1h',
      })
      res.status(200).json({ token })
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Something went wrong in login route! Try again!' })
    }
  }
)

export default authRouter
