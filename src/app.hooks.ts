// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

import { HookContext } from "@feathersjs/feathers";

export const skipPagination = async ( context: HookContext ) => {
  if ( context.params.query && context.params.query.hasOwnProperty('$paginate') ) {
    context.params.paginate =
      ( context.params.query.$paginate === 'false' || context.params.query.$paginate === false ) ?
      false :
      context.params.paginate;

    delete context.params.query.$paginate;
  }
};

export default {
  before: {
    all: [],
    find: [ skipPagination ],
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
