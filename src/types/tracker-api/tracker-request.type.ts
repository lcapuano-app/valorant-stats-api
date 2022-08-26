import { TrackerPlaylistType } from "./tracker-playlist.type";

export interface TrackerRequest {
  playlist    : TrackerPlaylistType;
  riotId      : string;
  requestUrl  : string;
  overviewUrl : string;
}
