import { GenericAny } from "../../generic-any.type";
import { TRNAgentAbilities, TRNAgentName, TRNAgentRole } from "../agent";
import { TRNPlaylist } from "../common";

export interface TRNSegmentMetaData extends GenericAny {
  name        : TRNPlaylist | TRNAgentName,
  imageUrl?   : string,
  role?       : TRNAgentRole,
  color?      : string,
  abilities?  : TRNAgentAbilities,
  matchCount? : number,
}




