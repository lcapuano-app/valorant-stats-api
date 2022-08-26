import * as authentication from '@feathersjs/authentication';
import { BadRequest, Unprocessable } from "@feathersjs/errors";
import { HookContext } from "@feathersjs/feathers";
import { By } from "selenium-webdriver";
import { TrackerController } from '../../controllers/tracker-api';
import { TrackerRequest } from '../../types/tracker-api';
import { getChromeDriver, xvfbInit, xvfbStop } from "../../util";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const trackerReq = async ( context: HookContext ) => {
  xvfbInit();
  context = TrackerController.reqPrepare( context );

  if ( !context.params?.reqPayload )
    throw new Unprocessable('Request failed', { data: context?.params?.query })

  const driver = await getChromeDriver();
  const reqPayload: TrackerRequest = context.params.reqPayload;

  if ( !reqPayload?.requestUrl || reqPayload.requestUrl.length == 0 )
    throw new BadRequest('Could not find a proper Tracker.gg api route');

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

  return context
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
