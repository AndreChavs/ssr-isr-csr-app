import { FireStorage } from "@/functions/FireStorage";
import { AddSlideRequest, SlideRequest, UpdateSlideRequest } from "@/global/interfaces/slide.interface";
import { PrismaClient } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";


export class SlideService{
  private prisma: PrismaClient;
  private slideStorage: FireStorage;

  constructor(){
    this.prisma = new PrismaClient();
    this.slideStorage = new FireStorage('slides')
  }


  public async getFindMany(req:NextApiRequest, res:NextApiResponse){
    try {
      const result = await this.prisma.sliders.findMany()
      if(result){
        return res.status(200).json(result)
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao buscar dados: ${error}`})
    }
  }

  public async postAddNewSlide(req:NextApiRequest, res:NextApiResponse){
    try {
      const data:AddSlideRequest = req.body

      const urlImage = await this.slideStorage.UploadFile(data.image.base64, data.image.fileData)
      const urlImageMobile = await this.slideStorage.UploadFile(data.imageMobile.base64, data.imageMobile.fileData)

      const result = await this.prisma.sliders.create({
        data:{
          image: urlImage,
          imageMobile: urlImageMobile,
          button: data.button,
          textButton: data.textButton,
          paragraph: data.paragraph
        }
      })
      if(result){
        return res.status(200).json({message: 'Dados enviados com sucesso'})
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
    }
  }

  public async updateSlide(req:NextApiRequest, res:NextApiResponse){
    try {
      const data:UpdateSlideRequest = req.body
      const recuperacao = await this.prisma.sliders.findUnique({
        where:{id: data.id}
      })
      if(!recuperacao) throw new Error()
      const urlImage = await this.slideStorage.UpdateFile(recuperacao?.image, data.image.fileData, data.image.base64)

      const urlImageMobile = await this.slideStorage.UpdateFile(recuperacao?.imageMobile, data.imageMobile.fileData, data.imageMobile.base64)

      const result = await this.prisma.sliders.update({
        where:{id: data.id},
        data:{
          image: urlImage,
          imageMobile: urlImageMobile,
          button: data.button,
          textButton: data.textButton,
          paragraph: data.paragraph
        }
      })
      if(result){
        return res.status(200).json({message: "Dados alterados com sucesso"})
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao atualizar dados: ${error}`})
    }
  }

  public async deleteSlide(req:NextApiRequest, res:NextApiResponse){
    try {
      const {id}:{id: string} = req.body
      const result = await this.prisma.sliders.delete({
        where:{id:id}
      })
      if (result) {
        await this.slideStorage.DeleteFile(result.image)
        await this.slideStorage.DeleteFile(result.imageMobile)
        return res.status(200).json({message: "Arquivo deletado com sucesso"})
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao deletar dados: ${error}`})
    }
  }

}