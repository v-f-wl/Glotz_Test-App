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
  if (req.method === 'POST') {
    try{
        await connectDB()
        const user = await UserModal.findOne({ email: req.body.email})
        if(!user){
          return res.status(404).json({
            message: 'Пользователь не найден'
          })
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPassword){
          return res.status(409).json({
            message: 'Неверный логин или пароль'
          })
        }
        const token = jwt.sign({
          _id: user._id
        }, 
          process.env.JVT_SECRET,
          {
            expiresIn: '30d'
          }
        )
        const {passwordHash, ...userData} = user._doc
        return res.json({
          ...userData,
          token
        })
    
      }catch(error){
        console.log(error)
        res.status(500).json({
          message: 'Не удалось авторизоваться'
        })
      }
  } else{
    return res.status(500).json({
      message: 'Что-то  пошло не так'
    })
  }
  
}