import { Unprocessable } from "@feathersjs/errors";
import { HookContext } from "@feathersjs/feathers";
import { TRK_URLS } from "../../services/tracker/tracker.consts";
import { TrackerPlaylistType, TrackerRequest } from "../../types/tracker-api";

export class TrackerController {

  static getTrackerUrl ( playlist: TrackerPlaylistType, riotId: string ): string {
    playlist = playlist.toUpperCase() as TrackerPlaylistType; // ENSURES UPPER
    const userNameTag: string[] = riotId.split('#');

    if ( !userNameTag || userNameTag?.length < 2 )
      return '';

    const username: string = encodeURI( userNameTag?.[0] );
    const tag: string = encodeURI( userNameTag?.[1] );
    let url: string = (TRK_URLS?.[playlist] || TRK_URLS.PROFILE).toString();
    url = url.replace('[@username]', username).replace('[@tag]', tag );

    return url;
  }

  static getReqPayload = ( playlist: TrackerPlaylistType, riotId: string ): TrackerRequest => {

    riotId += riotId.includes('#') ? '' : '#Quake';

    const requestUrl: string = this.getTrackerUrl( playlist, riotId );
    const overviewUrl: string = this.getTrackerUrl('OVERVIEW', riotId );

    return { playlist, riotId, requestUrl, overviewUrl }
  }

  static reqPrepare = ( context: HookContext ): HookContext => {
    const playlist: TrackerPlaylistType = context?.params?.query?.playlist?.toUpperCase() || 'PROFILE'
    const riotIdRaw: string = context?.params?.query?.riotId || context.id;
    context.id = '';

    if ( !riotIdRaw || riotIdRaw?.length == 0 )
      throw new Unprocessable('Invalid riot id' );

    const reqPayload: TrackerRequest = this.getReqPayload( playlist, riotIdRaw );

    context.params.reqPayload = reqPayload;

    return context
  }

}
