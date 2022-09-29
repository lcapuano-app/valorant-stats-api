import * as authentication from '@feathersjs/authentication';
import { HookContext, Paginated } from '@feathersjs/feathers';
import { HookResponse } from '../../declarations';
import { Quote, QuoteSimple } from '../../models/bot-quotes.model';
import Jimp from'jimp'
import { getBkg, getAuthorImg, blendImgs, addText } from './bot-quotes.controller';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const createImgBefore = async ( context: HookContext ): HookResponse => {

  if ( !context?.params?.query?.createImg )
    return context;

  if ( !context?.id )
    return context;

  context.params.createImg = context?.id;

  return context;
}

const createImg = async ( context: HookContext ): HookResponse => {

  if ( !context.params?.createImg )
    return context;

  const quote: Quote = context.result;

  if ( !quote?._id )
    return context;

  const bkgImg = await getBkg();
  const authorImg = await getAuthorImg( quote.author.idName );
  let img = blendImgs( bkgImg, authorImg );

  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

  img = await addText( img, quote.msg );

  await img.writeAsync('zzzzzzzzzzzz.png')
  //console.log('PASSO AQUI?', bkgImg)
  return context
}

const toSimpleResBefore = async ( context: HookContext ): HookResponse => {

  if ( !context?.params?.query?.$simple )
    return context;

  context.params.$simple = true;
  delete context.params?.query?.$simple;

  return context
}

const toSimpleRes = async ( context: HookContext ): HookResponse => {

  if ( !context.params?.$simple )
    return context;

  const toSimpleResOne = ( quote: Quote ): QuoteSimple => {
    return {
      _id: quote._id,
      displayName: quote?.author?.displayName,
      idName: quote?.author?.idName ,
      msg: quote?.msg,
      createdAt: quote?.createdAt,
      updatedAt: quote?.updatedAt
    }
  }

  const toSimpleResMany = ( quotes: Quote[] ): QuoteSimple[] => {
    return quotes.map( quote => toSimpleResOne( quote ) )
  }

  const result: Quote | Quote[] | Paginated<Quote> = context.result;

  if ( !result )
    return context;

  if ( Array.isArray( context.result ) )
    context.result = toSimpleResMany( context.result );

  else if( context?.result?.data )
    context.result.data = toSimpleResMany( context.result.data )

  else
    context.result = toSimpleResOne( context.result )

  return context
}

const pp = async ( context: HookContext ): HookResponse => {
  console.log('QUE PORRA NO BEFORE', context.data)
  return context
}

const hh = async ( context: HookContext ): HookResponse => {
  console.log('QUE PORRA NO AFTER', context.result)
  return context
}

export default {
  before: {
    all: [ authenticate('api-key') ],
    find: [/* createFromJson, */ toSimpleResBefore],
    get: [createImgBefore, toSimpleResBefore],
    create: [],
    update: [],
    patch: [ pp ],
    remove: []
  },

  after: {
    all: [],
    find: [ toSimpleRes ],
    get: [createImg, toSimpleRes],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};


/* const createFromJson = async ( context: HookContext ): HookResponse => {
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
} */
