import { TrackerUrls } from "../../types/tracker-api";

const TRK_BASE     = "https://api.tracker.gg/api/v2/valorant/standard";
const TRK_OVERVIEW = "https://tracker.gg/valorant/profile/riot/[@username]%23[@tag]/overview";

const TRK_PROFILE  = TRK_BASE + "/profile/riot/[@username]%23[@tag]?type=competitive";
const TRK_MATCH    = TRK_BASE + "/matches/riot/[@username]%23[@tag]?type=competitive";

const TRK_AGENT    = TRK_PROFILE + "/segments/agent?playlist=competitive";
const TRK_MAP      = TRK_PROFILE + "/segments/map?playlist=competitive";
const TRK_WEAPON   = TRK_PROFILE + "/segments/weapon?playlist=competitive";

const TRK_SEARCH   = "https://api.tracker.gg/api/v2/valorant/standard/search?platform=riot&query=[@username]&autocomplete=true";

export const TRK_URLS: TrackerUrls = {
  AGENT    : TRK_AGENT,
  MAP      : TRK_MAP,
  MATCH    : TRK_MATCH,
  OVERVIEW : TRK_OVERVIEW,
  SEARCH   : TRK_SEARCH,
  PROFILE  : TRK_PROFILE,
  WEAPON   : TRK_WEAPON
}
