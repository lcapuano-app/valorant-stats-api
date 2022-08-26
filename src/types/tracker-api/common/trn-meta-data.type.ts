import { GenericAny } from "../../generic-any.type";

export interface TRNMetaData extends GenericAny{
  schema          : string,
  privacy         : string,
  defaultPlaylist : string
}
