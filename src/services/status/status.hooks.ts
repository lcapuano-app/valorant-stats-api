import { HookContext } from '@feathersjs/feathers';
import axios from 'axios';

const valorantServer = async (): Promise<number> => {

  try {
    const valorantUrl = 'https://api.henrikdev.xyz/valorant/v1/status/br';
    const { data } = await axios.get(valorantUrl)
    return data?.status || -1;
  } catch (error) {
    return -1
  }
}

const status = async ( context: HookContext ) => {

  const status = { api: 500, valorant: 500 };

  const getSts = await valorantServer();

  if ( !getSts || getSts == -1 ) {
    context.statusCode = 500;
    context.result = status;
    return context;
  }

  status.api = 200;
  status.valorant = getSts;

  context.result = status;
  return context
}

export default {
  before: {
    all: [ status ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
