import connectDB from "../../../utils/connectMongoDB";
import UserModel from '../../../models/User'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  connectDB()
  if (req.method === 'POST') {
    try {
      // Обновление всех документов, у которых myResults отсутствует
      await UserModel.updateMany({ resultsOfTest: { $exists: false } }, { $set: { resultsOfTest: {} } });

      res.status(200).json({
        message: 'Поле resultsOfTest успешно добавлено'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Не удалось выполнить обновление'
      });
    }
  }else{
    return res.status(500).json({
      message: 'Что-то пошло не так '
    })
  }
}