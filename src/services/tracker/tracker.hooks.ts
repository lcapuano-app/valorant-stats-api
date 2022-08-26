import * as authentication from '@feathersjs/authentication';
import { BadRequest, Unprocessable } from "@feathersjs/errors";
import { HookContext } from "@feathersjs/feathers";
import { By } from "selenium-webdriver";
import { TrackerController } from '../../controllers/tracker-api';
import { TrackerPlaylistType, TrackerRequest } from '../../types/tracker-api';
import { getChromeDriver, xvfbInit, xvfbStop } from "../../util";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const makeScrapCall = async ( reqPayload: TrackerRequest, context: HookContext ) => {
  xvfbInit();
  const driver = await getChromeDriver();

  try {
    await driver.get( reqPayload.requestUrl );
    const rawResponse: string = await driver.findElement(By.css('pre')).getText()
    const { data } = JSON.parse( rawResponse );
    data.trackerProfile = reqPayload.overviewUrl;
    data.riotId = reqPayload.riotId;
    context.result = data;
  } finally {
    await driver.quit();
    xvfbStop();
  }

  context.result.date = new Date().toISOString();

  TrackerController.pushProfileResponse(context.result);

  return context
}

const getCacheResponse = ( playlist: TrackerPlaylistType, riotId: string ) => {

  switch (playlist) {
    case 'PROFILE':
      return TrackerController.cacheSearchProfile( riotId );

    default:
      return TrackerController.cacheSearchProfile( riotId );
  }
}

const trackerReq = async ( context: HookContext ) => {

  context = TrackerController.reqPrepare( context );

  if ( !context.params?.reqPayload )
    throw new Unprocessable('Request failed', { data: context?.params?.query })


  const reqPayload: TrackerRequest = context.params.reqPayload;

  if ( !reqPayload?.requestUrl || reqPayload.requestUrl.length == 0 )
    throw new BadRequest('Could not find a proper Tracker.gg api route');

  const cacheResponse = getCacheResponse( reqPayload.playlist, reqPayload.riotId );

  if ( !cacheResponse || !cacheResponse?.date )
    return await makeScrapCall(reqPayload, context);

  context.result = cacheResponse;

  return context;
}

export default {
  before: {
    all: [ authenticate('api-key') ],
    find: [ trackerReq ],
    get: [ trackerReq ],
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
