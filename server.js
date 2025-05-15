// import express from 'express'
// import cors from 'cors'
// // import 'dotenv/config'
// import dotenv from 'dotenv';

// import connectDB from './config/mongodb.js'
// import userRouter from './routes/user.route.js'
// import imageRouter from './routes/image.route.js'

// dotenv.config();
// const PORT = process.env.PORT || 4000
// const app = express()
// app.use(express.json())
// app.use(cors())
// await connectDB()

// app.use('/api/user', userRouter)
// app.use('/api/image', imageRouter)
// app.get('/', (req, res)=>{
//     res.send("Api is working")
// })

// app.listen(PORT, ()=> console.log("api is running on the port" + PORT) );




import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/mongodb.js'
import userRouter from './routes/user.route.js'
import imageRouter from './routes/image.route.js'

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())

import cors from 'cors'

const allowedOrigins = ['https://imagifyv1.netlify.app', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));


// ✅ Handle preflight explicitly if needed
app.options('*', cors())

await connectDB()

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/', (req, res) => {
  res.send("API is working")
})

app.listen(PORT, () => console.log("API is running on port " + PORT))
