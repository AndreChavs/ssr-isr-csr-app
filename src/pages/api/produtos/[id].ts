import { CarroService } from "@/classes/services/CarroService.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const id = req.query.id;
 
  const carro = new CarroService();

  if(id && typeof id === 'string' && id.length !== 0){
    switch(req.method){
      case 'GET':        
        carro.GetFindById(req, res)
        break;
      
      default:
        res.status(405).json({error:"Requisição Inválida"})
        break;
    }
  }
  

}