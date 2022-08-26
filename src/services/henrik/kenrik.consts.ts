import { HenrikUrls } from "../../types/henrik-api";

const HRK_BASE = "https://api.henrikdev.xyz";
const RANK = HRK_BASE + "/valorant/v1/mmr/[@region]/[@username]/[@tag]";
const ACC = HRK_BASE + "/valorant/v1/account/[@username]/[@tag]";
const MMR = HRK_BASE + "/valorant/:version/mmr/[@region]/[@username]/[@tag]";
const MMR_HIST = HRK_BASE + "/valorant/v1/mmr-history/[@region]/[@username]/[@tag]";
const MATCH = HRK_BASE + "/valorant/v2/match/[@matchid]";
const MATCH_HIST = HRK_BASE + "/valorant/v3/matches/[@region]/[@username]/[@tag]";

export const HENRIK_URLS: HenrikUrls = {
  ACC,
  MATCH,
  MATCH_HIST,
  MMR,
  MMR_HIST,
  RANK
}
