import React from 'react'
import { InferGetStaticPropsType, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Sidebar from '@/layout/Sidebar'
import Content from '@/layout/Content'
import Container from '@/layout/Container'
import DataGrid from '@/components/DataGrid'
import { Grid12 } from '@/layout/Grid'
import { useStore } from '@/global/store'
import RequestData from '@/classes/requests/RequestData'
import { SlideRequest } from '@/global/interfaces/slide.interface'


const slideRequest = new RequestData()

export async function getServerSideProps(context: NextPageContext) { 
  
  const session = await getSession(context)  
  const slides = await slideRequest.getRequest<SlideRequest[]>('/api/sliders')    
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }  
  return {
    props: { 
      session, slides               
    }
  } 
}





export default function Admin(props:InferGetStaticPropsType<typeof getServerSideProps>) {
  const { data }  = useSession()  
  const dataSlide = useStore((state) => state.dataSlide)
  const setDataSlide = useStore((state) => state.setDataSlide)
    
  React.useEffect(() => {       
    if (dataSlide.length === 0 && props.slides) {      
      setDataSlide(props.slides)     
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataSlide.length])
  
  if(data){    
    return (
      <>
        <Sidebar user={data.user} />
        <Content>
          <Container className="wrap">
            <Grid12>
              <h1>Slider Configuration</h1>
            </Grid12>
            <Grid12>
              <DataGrid /> 
            </Grid12>
          </Container>    
        </Content>
        
      </>
    )
  } else {
    return null
  }
  
}

