import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType, PreviewData } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router'
import StaticGenerate from "@/functions/requests/StaticGenerate";
import { ParsedUrlQuery } from "querystring";

const requestGenerate = new StaticGenerate('/api/produtos', '/api/categoria/')



export const getServerSideProps: GetServerSideProps<{carro: DataGridCar}> = async (context) => {
  const id = context.query.id
  let carro
  if(id && typeof id == 'string'){
    const response = await fetch(`${process.env.NEXT_API_URL}/api/produtos/${id}`)
    const json = await response.json()
    carro = json
  }

    return {
      props: {carro}
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
