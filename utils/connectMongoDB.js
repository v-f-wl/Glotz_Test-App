import mongoose from 'mongoose'

const connectDB= async () => mongoose
.connect(process.env.MONGODB_KEY)
.then(() => console.log('DB Okay'))
.catch(() => console.log('Dont Connect'))

export default connectDB