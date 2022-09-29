import Jimp from'jimp';
import { HookContext } from "@feathersjs/feathers";
import { HookResponse } from "../../declarations";
import { QuoteJson, Quote } from "../../models/bot-quotes.model";
import app from '../../app';
import path from 'path';

const LIMIT_RATIO = 1.25;

const increaseIt = (
  w: number,
  h: number,
  parentWH: {w: number, h: number },
  imgLimits: {w: number, h: number }
): { w: number, h: number } => {

  const quotW = parentWH.w / w;
  const quotH = parentWH.h / h;
  let ratio = 1;

  if ( quotH > quotW )
    ratio = ( imgLimits.h - h ) / h;
  else
    ratio = ( imgLimits.w - w ) / w;

  h = Math.round( h * ( 1 + ratio ) )
  w = Math.round( w * ( 1 + ratio ) )

  return { w, h }
}

const decreaseIt = (
  w: number,
  h: number,
  parentWH: {w: number, h: number },
  imgLimits: {w: number, h: number }
): { w: number, h: number } => {

  const quotW = w / parentWH.w;
  const quotH = h / parentWH.h;
  let ratio = 1;

  if ( quotH > quotW )
    ratio = ( imgLimits.w - w ) / w;
  else
    ratio = ( imgLimits.h - h ) / h;

  h = Math.round( h * ( 1 + ratio ) )
  w = Math.round( w * ( 1 + ratio ) )

  return { w, h }
}

const resizeIt = (w: number, h: number, parentWH: {w: number, h: number } ): { w: number, h: number } => {
  const imgLimits = {
    w: parentWH.w * LIMIT_RATIO,
    h: parentWH.h * LIMIT_RATIO,
  }
  if ( w >= imgLimits.w && h >= imgLimits.h )
    return decreaseIt(w,h, parentWH, imgLimits );

  else
    return increaseIt(w, h, parentWH, imgLimits)
}

const getAuthorWH = ( bkg: Jimp, author: Jimp ): { h: number, w: number} => {

  const authorH = author?.getHeight() || 1;
  const authorW = author?.getWidth()  || 1;

  const bkgH = bkg?.getHeight() || 1;
  const bkgW = bkg?.getWidth()  || 1;

  return resizeIt( authorW, authorH, { w: bkgW, h: bkgH })
}

const quotesPath = () => {
  return `${app.get('protocol')}://${app.get('host')}:${app.get('port')}/bot-quotes/`
};

export const getAuthorImg = async ( imgName: string ): Promise<Jimp> => {
  const img = await Jimp.read( quotesPath() + imgName + '.jpg' )
  //img.grayscale();
  return img;
}

export const getBkg = async (): Promise<Jimp> => {
  const bkgImg = await Jimp.read( quotesPath() + 'bkg.png');
  return bkgImg
}

export const blendImgs = ( bkg: Jimp, author: Jimp ): Jimp => {
  const resizeValues = getAuthorWH( bkg, author );

  author
    .grayscale()
    .resize( resizeValues.w, resizeValues.h )
    .rotate(-15)



  bkg.composite( author, -220,-220,{
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 0.2
  })
  console.log( )
  return bkg;
}

export const addText = async ( img: Jimp, msg: string ): Promise<Jimp> => {
  const margins = 200;
  const textCfg = {
    text: msg,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
  };
  const maxWidth = (img.getWidth() - margins) || 20;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
 /*  const fontsDir = require('#fonts-robot-gold-24')
  console.log(fontsDir) */
  '../../../config/fonts/Roboto-BoldItalic/0YRr6q_oZxVOnXY1NDXF6ubA.ttf.fnt'
  const font = await Jimp.loadFont('./config/fonts/Roboto-BoldItalic/0YRr6q_oZxVOnXY1NDXF6ubA.ttf.fnt');

  const textHeight = Jimp.measureTextHeight(font, msg, maxWidth) || 20;


  const y = ((img.getHeight() / 2) - (textHeight / 2)) - 60;
  const x = (maxWidth / 2) - ( margins )

  console.log('UNS 200?', x)
  return img.print( font, x, y, textCfg, maxWidth );
}

const createFromJson = async ( context: HookContext ): HookResponse => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fromJsonQuotes: QuoteJson[] = require('#quotes') || [];

  const quotes: Quote[] = fromJsonQuotes?.map( jqt =>  {
    const quote: Quote = <Quote>{};

    quote.author = {
      displayName: jqt?.author,
      idName: jqt.author?.trim()?.replace(/ /g, '')?.toLowerCase(),
      quoteName: jqt?.author
    };
    quote.imgs = { qt: jqt?.img, sm: jqt?.img };
    quote.msg = jqt?.msg;
    quote.type = jqt?.type;
    return quote;
  });

  try {
    const res = await context.service.create( quotes )
    context.result = res || 'success';
  } catch (error) {
    context.result = error
  }

  return context
}
