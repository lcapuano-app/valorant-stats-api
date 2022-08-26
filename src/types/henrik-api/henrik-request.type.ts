import { HenrikPlaylistType } from "./henrik-playlist.type";

export interface HenrikRequest {
  playlist    : HenrikPlaylistType,
  riotId      : string,
  requestUrl  : string,
  overviewUrl : string;
}
