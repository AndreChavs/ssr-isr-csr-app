import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { FireStorage } from "@/libs/FireStorage";
import { AddCarroRequest, UpdateCarroRequest } from "@/global/interfaces/carro.interface";


export class CarroService{
  private prisma:PrismaClient;
  private produtoStorage:FireStorage;
  constructor(){
    this.prisma = new PrismaClient()
    this.produtoStorage = new FireStorage('carros')
  }

  public async GetFindMany(req:NextApiRequest, res:NextApiResponse):Promise<void>{
    try {
      const result = await this.prisma.carros.findMany();
      if (result) {        
        return res.status(200).json(result)
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao buscar Dados: ${error}`})
    }
  }


  public async GetFindById(req:NextApiRequest, res:NextApiResponse){
    try {
      const id = req.query.id
      if (!id || typeof id !== 'string') throw new Error()
      const result = await this.prisma.carros.findUnique({
        where:{id}
      })
      if (result) {
        return res.status(200).json(result)
      }        
      
    } catch (error) {
      return res.status(404).json({error:`Erro ao buscar Dados: ${error}`})
      
    }
  }

  public async PostAddNewCar(req:NextApiRequest, res:NextApiResponse){
    try {
      const data:AddCarroRequest = req.body
      const urlImage = await this.produtoStorage.UploadFile(data.image.base64, data.image.fileData)
      const result = await this.prisma.carros.create({
        data:{
          image: urlImage,
          categoria: data.categoria,
          marca: data.marca,
          modelo: data.modelo,
          ano: data.ano
        }
      })
      if(result){
        return res.status(200).json({message: 'Dados enviados com sucesso'})
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
    }
  }

  public async UpdateCar(req:NextApiRequest, res:NextApiResponse){
    try {
      const data:UpdateCarroRequest = req.body;
      const recuperacao = await this.prisma.carros.findUnique({
        where:{id: data.id}
      });
      if(!recuperacao) throw new Error()
      const urlImage = await this.produtoStorage.UpdateFile(recuperacao.image, data.image.fileData, data.image.base64);
      const result = await this.prisma.carros.update({
        where:{id:data.id},
        data:{
          image: urlImage,
          categoria: data.categoria,
          ano: data.ano,
          marca: data.marca,
          modelo: data.modelo
        }
      })
      if(result){
        return res.status(200).json({message: "Dados Alterados com Sucesso !"})
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
    }
  }

  public async DeleteCar(req:NextApiRequest, res:NextApiResponse){
    try {
      const {id}:{id: string} = req.body
      const result = await this.prisma.carros.delete({
        where:{id}
      });
      if (result) {
        await this.produtoStorage.DeleteFile(result.image)
        return res.status(200).json({message:"Arquivo deletado com sucesso"})
      }

    } catch (error) {
      return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
    }
  }

}

