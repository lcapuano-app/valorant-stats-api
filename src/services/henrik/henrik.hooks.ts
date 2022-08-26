import * as authentication from '@feathersjs/authentication';
import { BadRequest, Unprocessable } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import axios from 'axios'
import { HenrikController } from '../../controllers/henrik-api';
import { HenrikApiRankResData, HenrikRequest, HerikApiRes } from '../../types/henrik-api';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const makeApiCall = async (reqPayload: HenrikRequest, context: HookContext ) => {
  try {
    const response = await axios.get<HerikApiRes<HenrikApiRankResData>>(reqPayload.requestUrl);
    context.result = response?.data;
  } catch (err: any) {
    context.statusCode = err?.response?.status;
    context.result = err?.response?.data;
  }
  context.result.date = new Date().toISOString();
  context.result.trackerProfile = reqPayload.overviewUrl;

  HenrikController.pushRankResponse(context.result);

  return context;
}

const henrikReq = async ( context: HookContext ) => {

  context = HenrikController.reqPrepare( context );

  if ( !context.params?.reqPayload )
    throw new Unprocessable('Request failed', { data: context?.params?.query })

  const reqPayload: HenrikRequest = context.params.reqPayload;

  if ( !reqPayload?.requestUrl || reqPayload.requestUrl.length == 0 )
    throw new BadRequest('Could not find a proper HenrikDev api route');

  const cacheResponse = HenrikController.cacheSearchRank( reqPayload.riotId );

  if ( !cacheResponse || !cacheResponse?.date )
    return await makeApiCall(reqPayload, context);

  context.result = cacheResponse;

  return context;

}


export default {
  before: {
    all: [ authenticate('api-key') ],
    find: [ henrikReq ],
    get: [ henrikReq ],
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


