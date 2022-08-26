import { GenericAny } from "../../generic-any.type";
import { TRNMetaData } from "../common";
import { TRNPlatformInfo } from "../platform";
import { TRNPlayerInfo } from "../player";
import { TRNSegment } from "../segment";

export interface TRNProfile extends GenericAny {
  platformInfo: TRNPlatformInfo,
  userInfo: TRNPlayerInfo,
  metadata: TRNMetaData,
  segments: TRNSegment[],
  availableSegments: any,
  expiryDate: string
}
