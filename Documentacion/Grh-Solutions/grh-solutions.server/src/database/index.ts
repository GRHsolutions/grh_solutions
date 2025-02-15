import mongoose,{connect} from 'mongoose';
import {MONGO_URI} from '../config';

export const connectDB = ()=>{
  try{
    mongoose.set('strictQuery', true);
    connect(MONGO_URI as string, ()=>{
      console.log('Conectado a mongoDb');    
    })
  }
  catch{
    console.error('Error conectando a mongoDb, revise connection strings')
  }
}