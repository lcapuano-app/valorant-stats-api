import { Unprocessable } from "@feathersjs/errors";
import { HookContext } from "@feathersjs/feathers";
import { HENRIK_URLS } from "../../services/henrik/kenrik.consts";
import { HenrikApiRankResData, HenrikPlaylistType, HenrikRegion, HenrikRequest, HerikApiRes } from "../../types/henrik-api";
import { getRiotIdTag } from "../../util";
import { TrackerController } from "../tracker-api";

const SEARCH_LIMIT_MIN = 30;

export class HenrikController {

  static rankResponses: HerikApiRes<HenrikApiRankResData>[] = [];

  static cacheSearchRank( riotIdFull: string ): HerikApiRes<HenrikApiRankResData> {

    const riotIdTag = getRiotIdTag( riotIdFull );

    if ( riotIdTag.err )
      return <HerikApiRes<HenrikApiRankResData>>{};


    const idx = this.rankResponses.findIndex( res => this.findRankResponse( res, riotIdTag.riotId, riotIdTag.tag ) );

    if ( idx < 0 )
      return <HerikApiRes<HenrikApiRankResData>>{};

    return this.rankResponses[idx];

  }

  static getUrl( playlist: HenrikPlaylistType, riotId: string, region: HenrikRegion = 'na' ): string {
    playlist = playlist.toUpperCase() as HenrikPlaylistType; // ENSURES UPPER
    const userNameTag: string[] = riotId.split('#');

    if ( !userNameTag || userNameTag?.length < 2 )
      return '';

    const username: string = encodeURI( userNameTag?.[0] );
    const tag: string = encodeURI( userNameTag?.[1] );
    let url: string = (HENRIK_URLS?.[playlist] || HENRIK_URLS.RANK).toString();
    url = url.replace('[@username]', username)
             .replace('[@tag]', tag )
             .replace('[@region]', region);

    return url;
  }

  static getReqPayload ( playlist: HenrikPlaylistType, riotId: string ): HenrikRequest  {

    riotId += riotId.includes('#') ? '' : '#Quake';

    const requestUrl: string = this.getUrl( playlist, riotId );
    const overviewUrl : string = TrackerController.getTrackerUrl('OVERVIEW', riotId );

    return { playlist, riotId, requestUrl, overviewUrl }
  }

  static reqPrepare ( context: HookContext ): HookContext {
    const playlist: HenrikPlaylistType = context?.params?.query?.playlist?.toUpperCase() || 'RANK'
    const riotIdRaw: string = context?.params?.query?.riotId || context.id;
    context.id = '';

    if ( !riotIdRaw || riotIdRaw?.length == 0 )
      throw new Unprocessable('Invalid riot id' );

    const reqPayload: HenrikRequest = this.getReqPayload( playlist, riotIdRaw );

    context.params.reqPayload = reqPayload;

    return context
  }

  static pushRankResponse( rankRes: HerikApiRes<HenrikApiRankResData> ): void {
    const idx = this.rankResponses.findIndex( res => this.findRankResponse( res, rankRes?.data?.name, rankRes?.data?.tag, false ) );

    if ( idx < 0 ) {
      this.rankResponses.push( rankRes );
      return;
    }
    this.rankResponses.splice( idx, 1 );
    this.rankResponses.push( rankRes );
    return;
  }

  static clearCache(): void {
    this.rankResponses = [];

    const dayMillis = 1000 * // Millis
                      60   * // Seconds
                      60   * // Minutes
                      24;    // Hours

    setTimeout(() => this.clearCache(), dayMillis );
  }

  private static findRankResponse( res: HerikApiRes<HenrikApiRankResData>, riotId: string, tag: string, useDate = true ): boolean {

    const sameRiotId: boolean = ( res?.data?.name?.toLowerCase().trim() == riotId?.toLowerCase().trim() );
    const sameTag: boolean = ( res?.data?.tag?.toLowerCase().trim() == tag?.toLowerCase().trim() );

    if ( !useDate )
      return sameRiotId && sameTag;


    if ( !res?.date )
      return false;

    if ( !sameRiotId || !sameTag )
      return false;

    const nowMillis: number = new Date().getTime();
    const prevMillis: number = new Date( res.date ).getTime();
    const diffMillis: number = nowMillis - prevMillis;
    const diffMin: number = diffMillis / 1000 / 60;

    return diffMin <= SEARCH_LIMIT_MIN;
  }

}
