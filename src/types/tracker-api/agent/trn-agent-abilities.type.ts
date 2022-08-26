import { GenericAny } from "../../generic-any.type";

export interface TRNAgentAbilities extends GenericAny {
  Ability1 : { name: string, imageUrl: string },
  Ability2 : { name: string, imageUrl: string },
  Grenade  : { name: string, imageUrl: string },
  Ultimate : { name: string, imageUrl: string },
  Passive? : { name: string, imageUrl: string },
}
