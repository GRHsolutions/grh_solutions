import {Schema, model} from 'mongoose';

const taskSchema = new Schema({
  name:{
    type: String
  },
  lastName:{
    type: String
  },
  description:{
    type: String
  },
  isChecked: {
    type: Boolean
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios', // referencia a la colección usuarios
    required: true
  }
});


export const TaskModel = model('tasks', taskSchema);