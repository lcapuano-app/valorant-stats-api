// bot-quotes-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'botQuotes';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    author: {
      displayName : { type: String, required: true },
      idName      : { type: String, required: true },
      quoteName   : { type: String, required: true },
    },
    imgs: {
      sm: { type: String, required: true },
      qt: { type: String, required: true }
    },
    msg: { type: String, required: true },
    type: [{ type: String, enum: QUOTES_CATEGORIES, required: true }],
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}

export enum QUOTES_CATEGORIES {
  ALEATORIA = 'ALEATORIA',
  BRONCA = 'BRONCA',
  ERROR = 'ERROR',
  OK = 'OK',
  OPCOES = 'OPCOES',
  RECLAMA = 'RECLAMA',
  SARRO = 'SARRO',
}

export type QuoteCateg =
  'ALEATORIA'     |
  'BRONCA'        |
  'ERROR'         |
  'OK'            |
  'OPCOES'        |
  'SARRO'         |
  'RECLAMA'       ;

export interface Quote {
  _id?   : string,
  author : QuoteAuthor,
  imgs   : QuoteImages,
  msg    : string,
  type   : QuoteCateg[],

  createdAt?: string,
  updatedAt?: string
}

export interface QuoteAuthor {
  displayName : string,
  idName      : string,
  quoteName   : string,
}

export interface QuoteImages {
  sm: string,
  qt: string,
}

export interface QuoteJson {
  author : string,
  img    : string,
  msg    : string,
  type   : QuoteCateg[]
}

export interface QuoteSimple {
  _id?        : string,
  displayName : string,
  idName      : string,
  msg         : string,
  createdAt?  : string,
  updatedAt?  : string,
}
