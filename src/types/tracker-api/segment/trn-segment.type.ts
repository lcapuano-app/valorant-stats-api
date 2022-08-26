import { GenericAny } from "../../generic-any.type";
import { TRNPlaylist } from "../common"
import { TRNPlaylistStats, TRNRecentStats } from "../stats";
import { TRNSegmentMetaData } from "./trn-segment-meta-data.type";
import { TRNSegmentType } from "./trn-segment-type.type";

export interface TRNSegment extends GenericAny {
  type       : TRNSegmentType,
  attributes : { key: string, playlist: TRNPlaylist } | GenericAny,
  metadata   : TRNSegmentMetaData,
  expiryDate : string,
  stats      : TRNPlaylistStats | TRNRecentStats | GenericAny,
}
