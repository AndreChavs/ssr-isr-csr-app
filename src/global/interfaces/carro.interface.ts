export interface CarroRequest{
  id: string;
  image: string;
  marca: string;
  modelo: string;
  categoria: string;
  ano: string;
}

export interface AddCarroRequest{
  image: {
    base64:string;
    fileData: FileData;
  };
  categoria: string;
  modelo: string;
  marca: string;
  ano: string;
}

export interface UpdateCarroRequest{
  id: string;
  image: {
    base64:string;
    fileData: FileData;
  };
  categoria: string;
  modelo: string;
  marca: string;
  ano: string;
}


