import {NextApiRequest, NextApiResponse} from 'next'
import { SlideService } from '@/classes/services/SlideService.service';
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  const slide = new SlideService()

  switch (req.method) {
    case 'GET':      
      slide.getFindMany(req, res)
      break;
    case 'POST':      
      slide.postAddNewSlide(req, res)
      break;
    case 'PUT':      
      slide.updateSlide(req, res)
      break;
    case 'DELETE':      
      slide.deleteSlide(req, res)
      break;
    default:
      res.status(405).json({error:"Requisição invalida"})
      break;
  }
}

