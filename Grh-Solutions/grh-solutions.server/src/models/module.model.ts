import { Schema, model } from 'mongoose';

const moduleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Module name is required'],
    unique: true,
    trim: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Índices
moduleSchema.index({ name: 1 });
moduleSchema.index({ disabled: 1 });

export const ModuleModel = model("module", moduleSchema);
