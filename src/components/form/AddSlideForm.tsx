import React from 'react'
import convertImageToBase64 from '@/functions/conversorBase64';
import Image from 'next/image';
import styles from '../../styles/modules/Form.module.css'
import {useStore} from '../../global/store'
import { AddSlideRequest } from '@/global/interfaces/slide.interface';
import RequestData from '@/classes/requests/RequestData';


const slideRequest = new RequestData()

interface ModalProps{
  setModal:React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSlideForm = ({setModal}: ModalProps) => {
  const [image1, setImage1] = React.useState<{base64: string, fileData:FileData}>();
  const [image2, setImage2] = React.useState<{base64: string, fileData:FileData}>();
  const [checkbox, setCheckbox] = React.useState<boolean>(false);
  const [btnText, setBtnText] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const setDataSlide = useStore((state) => state.setDataSlide)
   
  const handleImage1Change = async ({target}:React.ChangeEvent) => {
    if (target instanceof HTMLInputElement) {
      const files = target.files
      if (files) {        
        const image = files[0]
        const base64Image = await convertImageToBase64(image)
        if (typeof base64Image === 'string'){            
          setImage1({base64: base64Image, fileData:{
            name:image.name,            
            type:image.type,            
          }})          
        }
      }
    }
  };

  const handleImage2Change = async ({target}:React.ChangeEvent) => {
    if (target instanceof HTMLInputElement) {
      const files = target.files
      if (files) {
        const image = files[0]        
        const base64Image = await convertImageToBase64(image)
        if (typeof base64Image === 'string') {
          setImage2({base64: base64Image, fileData:{
            name:image.name,            
            type:image.type,            
          }})
        }
      }      
    }
  };

  const handleCheckboxChange = ({target}:React.ChangeEvent) => {
    if (target instanceof HTMLInputElement) {           
      setCheckbox(target.checked);
    }    
  };

  const handleBtnTextChange = (event:any) => {
    setBtnText(event.target.value);
  };

  const handleTextChange = (event:any) => {
    setText(event.target.value);
  };
  
  const handleSubmit = async (event:React.FormEvent) => {
    event.preventDefault();    
    if (image1 && image2 && typeof image1 !== 'string' && typeof image2 !== 'string') {
      setIsLoading(true);
      const formData: AddSlideRequest = {      
        image: image1,
        imageMobile: image2,
        button: checkbox,
        textButton: btnText,
        paragraph: text,
      }
      if (typeof formData.image !== 'string' && typeof formData.imageMobile !== 'string') {
        await slideRequest.postSetDataRequest('/api/sliders',formData, setDataSlide)
      }               
      setIsLoading(false)
      setModal((modal) => !modal)      
    } else {
      alert('Adicione as Imagens')
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__divImg}>
        <label htmlFor="image1" className={styles.form__fileLabel}>Imagem 1:</label>
        <input type="file" id="image1" onChange={handleImage1Change} className={styles.form__fileInput} />
        {image1 && <Image src={image1.base64} alt="Imagem 1" width={30} height={30} />}
      </div>
      <hr />
      <div className={styles.form__divImg}>
        <label htmlFor="image2" className={styles.form__fileLabel}>Imagem 2:</label>
        <input type="file" id="image2" onChange={handleImage2Change} className={styles.form__fileInput} />
        {image2 && <Image src={image2.base64} alt="Imagem 2" width={30} height={30}/>}
      </div>
      <hr />
      <div>
        <label htmlFor="checkbox" className={styles.form__label}>Tem botão ?</label>
        <input type="checkbox" id="checkbox" checked={checkbox} onChange={handleCheckboxChange} className={styles.form__checkbox}/>
      </div>
      
      {checkbox ? <div>
        <label htmlFor="btntext" className={styles.form__label}>Texto do Botão</label>
        <input type="text" id="btntext" value={btnText} onChange={handleBtnTextChange} />
      </div> : null}     

      <div>
        <label htmlFor="text" className={styles.form__label}>Texto do Slide</label>
        <input type="text" id="text" value={text} onChange={handleTextChange} />
      </div>

      {isLoading ? <button className={isLoading ? styles.loading : styles.form__submit} type="submit" disabled>
        {isLoading ? 'Carregando...' : 'Enviar'}
      </button> : <button className={isLoading ? styles.loading : styles.form__submit} type="submit">
        {isLoading ? 'Carregando...' : 'Enviar'}
      </button>}
      
      
    </form>
  );
}

export default AddSlideForm