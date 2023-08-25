import Controller from "@/functions/controllers/produto/ProdutoController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const id = req.query.id
  const Service = new Controller()

  if(id && typeof id === 'string'){
    switch(req.method){
      case 'GET':
        Service.GetDataById(req, res, id)
        break;
      
      default:
        res.status(405).json({error:"Requisição Inválida"})
        break;
    }
  }


}