import { Unprocessable } from "@feathersjs/errors";
import { HookContext } from "@feathersjs/feathers";
import { TRK_URLS } from "../../services/tracker/tracker.consts";
import { TrackerPlaylistType, TrackerRequest, TRNProfile } from "../../types/tracker-api";

const SEARCH_LIMIT_MIN = 30;
export class TrackerController {

  static profileResponses: TRNProfile[] = []

  static cacheSearchProfile( riotIdFull: string ): TRNProfile {

    if ( !riotIdFull )
      return <TRNProfile>{};

    const idx = this.profileResponses.findIndex( res => this.findRankResponse( res, riotIdFull ) );

    if ( idx < 0 )
      return <TRNProfile>{};

    return this.profileResponses[idx];

  }

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

  static pushProfileResponse( profileRes: TRNProfile ): void {
    const idx = this.profileResponses.findIndex( res => this.findRankResponse( res, profileRes?.platformInfo?.platformUserHandle, false ) );

    if ( idx < 0 ) {
      this.profileResponses.push( profileRes );
      return;
    }
    this.profileResponses.splice( idx, 1 );
    this.profileResponses.push( profileRes );
    return;
  }

  static clearCache(): void {
    this.profileResponses = [];

    const dayMillis = 1000 * // Millis
                      60   * // Seconds
                      60   * // Minutes
                      24;    // Hours

    setTimeout(() => this.clearCache(), dayMillis );
  }

  private static findRankResponse( res: TRNProfile, riotId: string, useDate = true ): boolean {

    const sameRiotId: boolean = ( res?.platformInfo.platformUserHandle?.toLowerCase().trim() == riotId?.toLowerCase().trim() );

    if ( !useDate )
      return sameRiotId;


    if ( !res?.date )
      return false;

    if ( !sameRiotId )
      return false;

    const nowMillis: number = new Date().getTime();
    const prevMillis: number = new Date( res.date ).getTime();
    const diffMillis: number = nowMillis - prevMillis;
    const diffMin: number = diffMillis / 1000 / 60;

    return diffMin <= SEARCH_LIMIT_MIN;
  }

}
