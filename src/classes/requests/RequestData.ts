export default class RequestData { 

  /*
  I -> Interface do objetos passados pelo parâmetro
  SetData -> refere-se a interface do argumento da função "setData()" que será passada através do parâmetro do método "getSetDataRequest()".

  parâmetro setData -> é o parametro que vai receber a função
  */

  private urlApiPath(url:string):string{
    if(process.env.NEXT_API_URL){
      return process.env.NEXT_API_URL + url
    } else {
      return window.location.origin + url
    }
  }
  
  public async getRequest<I>(url: string):Promise<I | null>{
    
  const response = await fetch(this.urlApiPath(url));
    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }

  public async getSetDataRequest<SetData>(
    url: string,
    setData: (formData: SetData) => void,
    ):Promise<void | null>{
      const response = await fetch(this.urlApiPath(url));
      if (response.ok) {
        setData(await response.json())
      } else {
        return null
      }
  }

  public async postSetDataRequest<I, T>(
    url: string,
    formData:I,
    setData: (data:T) => void 
    ){
    const options = {
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }

    const response = await fetch(this.urlApiPath(url), options);
    if (response.ok) {
      await this.getSetDataRequest(url, setData);
      const {message}:{message: string} = await response.json();      
      return message
    } else {
      return 'Falha ao enviar Dados'
    }

  }

  public async updateSetDataRequest<I, T>(
    url: string, 
    formData:I,
    setData: (data: T) => void
    ):Promise<string>{
    const options = {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    }
    const response = await fetch(this.urlApiPath(url), options);
    if (response.ok) {
      await this.getSetDataRequest(url, setData)
      const {message}:{message: string} = await response.json()
      return message
    } else {      
      return 'Falha ao Editar Dados'
    }

  }

  public async deleteSetDataRequest<T>(
    url: string,
    id: string,
    setData: (data:T) => void
  ):Promise<string>{
    const options = {
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({id: id})
    }
    const response = await fetch(this.urlApiPath(url), options);
    if(response.ok){
      const {message}:{message:string} = await response.json()
      await this.getSetDataRequest(url, setData)
      return message
    } else {
      return 'Erro ao excluir dados'
    }

  }


}