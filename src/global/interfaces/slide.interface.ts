export interface SlideRequest{
  id: string;  
  image: string;
  imageMobile: string;
  button: boolean;
  textButton: string;
  paragraph: string;
}

export interface AddSlideRequest{
  image: {
    base64:string;
    fileData: FileData ;
  };
  imageMobile: {
    base64:string;
    fileData: FileData;
  };
  button: boolean;
  textButton: string;
  paragraph: string;
}

export interface UpdateSlideRequest{
  id: string;  
  image: {
    base64:string;
    fileData: FileData ;
  };
  imageMobile: {
    base64:string;
    fileData: FileData;
  };
  button: boolean;
  textButton: string;
  paragraph: string;
}
