import { HenrikApiError } from "./henrik-error.type";

type HenrikApiData = HenrikApiRankResData

export interface HerikApiRes<T extends HenrikApiData> {
  status: number,
  data: T,
  errors?: HenrikApiError[],
  trackerProfile: string,
  date?: string
}

export interface HenrikApiRankResData {
  currenttier             : number,
  currenttierpatched      : string,
  images                  : HenrikApiDataImages,
  ranking_in_tier         : number,
  mmr_change_to_last_game : number,
  elo                     : number,
  name                    : string,
  tag                     : string,
  old                     : boolean
}

export interface HenrikApiDataImages {
  small         : string,
  large         : string,
  triangle_down : string,
  triangle_up   : string
}
