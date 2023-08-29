import { CarroService } from '@/classes/services/CarroService.service';
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) { 

  const carro = new CarroService()

  switch (req.method) {
    case 'GET':      
      carro.GetFindMany(req, res)      
      break;
    case 'POST':      
      carro.PostAddNewCar(req, res)      
      break;
    case 'PUT':      
      carro.UpdateCar(req, res)      
      break;
    case 'DELETE':      
      carro.DeleteCar(req, res)     
      break;
    default:
      res.status(405).json({error:"Requisição invalida"})
      break;
  } 
}