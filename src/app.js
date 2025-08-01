import express from "express"
import { query, validationResult, body, matchedData } from "express-validator"
import { users } from "./data/users.js"
import { hashing, isMatched } from "./utils/hash.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import { passportLogin } from "./middlewares/auth.js";
import passport from "passport";
import './strategies/local-strategy.js';
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/users.js'
import accessRoutes from './routes/access.js'
const app = express()

const PORT = 3000;
app.use(cookieParser())

app.use(session({
  secret: 'abcxyz',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60 * 24,
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(adminRoutes)
app.use(userRoutes)
app.use(accessRoutes)




app.get("/", (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  res.status(200).send({message: "Hello world"})
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})