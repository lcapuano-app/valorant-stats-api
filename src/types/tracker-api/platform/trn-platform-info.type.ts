import { GenericAny } from "../../generic-any.type";

export interface TRNPlatformInfo extends GenericAny {
  platformId?            : string,
  platformSlug           : 'riot',
  platformUserIdentifier : string,
  platformUserId         : string,
  platformUserHandle     : string,
  avatarUrl              : string,
  additionalParameters   : any,
}
