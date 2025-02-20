import { Schema, model } from 'mongoose';

interface IEmailLink {
    fileName: string,
    originalName: string
}

export interface IProduct {
    title: string,
    image: IEmailLink,
    category: string,
    description: string,
    price: number,
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
  },
  image: {
    fileName: {
      type: String,
      required: [true, 'Поле "fileName" должно быть заполнено'],
    },
    originalName: { type: String },
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  price: {
    type: Number,
    default: null,
  },
}, {
  versionKey: false,
});

export default model<IProduct>('product', productSchema);
