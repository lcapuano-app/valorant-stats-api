import { GenericAny } from "../../generic-any.type";
import { TRNRankTier } from "../tier";

export interface TRNStats extends GenericAny {
  rank            : string,
  percentile      : number,
  displayName     : string,
  displayCategory : string,
  category        : string,
  metadata        : { iconUrl?: string, tierName?: TRNRankTier },
  value           : number,
  displayValue    : string,
  displayType     : string
}
