import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.
type QuoteCat = 'ALEATORIA' | 'BRONCA' | 'ERROR' | 'OK' | 'OPCOES' | 'RECLAMA' | 'SARRO';
interface Quote {
  author: string,
  img: string,
  msg: string,
  type: QuoteCat[]
}

const { authenticate } = authentication.hooks;




const faker = async ( context: HookContext ) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const quotes: Quote[] = require('#quotes') || []
  context.result = quotes;
  return context
}

export default {
  before: {
    all: [ authenticate('api-key') ],
    find: [ faker ],
    get: [ faker ],
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
