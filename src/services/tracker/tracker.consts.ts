import { TrackerUrls } from "../../types/tracker-api";

const TRK_BASE     = "https://api.tracker.gg/api/v2/valorant/standard";
const TRK_OVERVIEW = "https://tracker.gg/valorant/profile/riot/[@username]%23[@tag]/overview";

const TRK_PROFILE  = TRK_BASE + "/profile/riot/[@username]%23[@tag]?type=competitive";
const TRK_MATCH    = TRK_BASE + "/matches/riot/[@username]%23[@tag]?type=competitive";

const TRK_AGENT    = TRK_PROFILE + "/segments/agent?playlist=competitive";
const TRK_MAP      = TRK_PROFILE + "/segments/map?playlist=competitive";
const TRK_WEAPON   = TRK_PROFILE + "/segments/weapon?playlist=competitive";

export const TRK_URLS: TrackerUrls = {
  OVERVIEW : TRK_OVERVIEW,
  PROFILE  : TRK_PROFILE,
  MATCH    : TRK_MATCH,
  AGENT    : TRK_AGENT,
  MAP      : TRK_MAP,
  WEAPON   : TRK_WEAPON
}
