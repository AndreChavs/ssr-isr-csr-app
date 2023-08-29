import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router'
import { CarroRequest } from "@/global/interfaces/carro.interface";



export const getServerSideProps: GetServerSideProps<{carro: CarroRequest}> = async (context) => {
  const id = context.query.id
  if(!id || typeof id == 'object') throw new Error()  
  
  const response = await fetch(`${process.env.NEXT_API_URL}/api/produtos/${id}`)
  const carro:CarroRequest = await response.json()
  
  if(carro.id !== id){
    return {
      notFound:true
    }
  } else {
    return {
      props: {carro}
    }
  }
  
}

export default function Carro({carro}:InferGetServerSidePropsType<typeof getServerSideProps> ) {

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  function render() {
    if (carro) { 
      return (
      <div>
        <div>
          <Image src={carro.image as string} alt={'wdaywhdawd'} width={380} height={300}/>
        </div>
        <h1 style={{color:'red'}}>{carro.marca} {carro.modelo}</h1>
        <h2>categoria: {carro.categoria}</h2>
        <h2>Marca: {carro.marca}</h2>
        <span>ID: {carro.id}</span>
      </div>)
    }
  }

  return <div style={{margin:"200px"}}>
    {render()}
    <div style={{margin:"20px", color:"blue"}}>
      <Link href='/' legacyBehavior><a>Voltar</a></Link>
    </div>
  </div>
}