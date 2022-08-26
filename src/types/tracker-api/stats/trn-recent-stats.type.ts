import { GenericAny } from "../../generic-any.type";
import { TRNStats } from "./trn-stats.type";

export interface TRNRecentStats extends GenericAny {
  headPct  : TRNStats,
  headHits : TRNStats,

  bodyPct  : TRNStats,
  bodyHits : TRNStats,

  legsPct  : TRNStats,
  legsHits : TRNStats,

  matches  : TRNStats,

}
