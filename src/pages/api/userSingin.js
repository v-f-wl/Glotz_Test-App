import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  connectDB()
  if (req.method === 'POST') {
    try{
        const password   = req.body.password
        const salt = await bcrypt.genSalt(11)
        const hash = await bcrypt.hash(password, salt)
        const doc = new UserModal({
          email: req.body.email,
          fullName: req.body.fullName,
          passwordHash: hash
        })
        const user = await doc.save()
    
        const token = jwt.sign({
          _id: user._id
        }, 
          process.env.JVT_SECRET,
          {
            expiresIn: '30d'
          }
        )
    
        const {passwordHash, ...userData} = user._doc
    
        res.json({
          ...userData,
          token
        })
    }catch(error){
      console.log(error)
      res.status(500).json({
        message: 'Не удалось зарегестироваться'
      })
    }
  }else{
    return res.status(500).json({
      message: 'Что-то пошло не так '
    })
  }
  
}