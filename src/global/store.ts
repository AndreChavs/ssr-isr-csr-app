import {create} from 'zustand';
import { CarroRequest } from './interfaces/carro.interface';
import { SlideRequest } from './interfaces/slide.interface';


//---------------------Slide--------------------

interface DataStore {
  dataSlide: SlideRequest[];
  setDataSlide: (formData:(SlideRequest)[] ) => void | null ;
}

const useStore = create<DataStore>((set) => ({
  dataSlide: [],
  setDataSlide: (formData) => set((state) => ({dataSlide:[...formData]})) 
}))


//------------------------------------------------------

interface TypeSidebar {
  active: boolean;
  setActive: () => void;
}

const useSidebar = create<TypeSidebar>( (set) => ({
  active: false,
  setActive: () => set((state) => ({active:!state.active}))
}))

//---------------------Carros---------------------------------

interface TypeDataCar {
  dataCar : CarroRequest[],
  setDataCar: (formData:(CarroRequest)[]) => void;
}
const useCar = create<TypeDataCar>( (set) => ({
  dataCar: [],
  setDataCar: (formData) => set( () => ({dataCar:[...formData]}))
}))

export {
  useStore,
  useSidebar,
  useCar
}