import { GenericAny } from "../../generic-any.type";
import { TRNStats } from "./trn-stats.type";

export interface TRNPlaylistStats extends GenericAny {
  timePlayed          : TRNStats,

  matchesPlayed       : TRNStats,
  matchesWon          : TRNStats,
  matchesLost         : TRNStats,
  matchesWinPct       : TRNStats,
  matchesDuration     : TRNStats,

  roundsPlayed        : TRNStats,
  roundsWon           : TRNStats,
  roundsLost          : TRNStats,
  roundsWinPct        : TRNStats,
  roundsDuration      : TRNStats,

  econRating          : TRNStats,
  econRatingPerMatch  : TRNStats,
  econRatingPerRound  : TRNStats,

  score               : TRNStats,
  scorePerMatch       : TRNStats,
  scorePerRound       : TRNStats,

  kills               : TRNStats,
  killsPerRound       : TRNStats,
  killsPerMatch       : TRNStats,
  killsPerMinute      : TRNStats,

  headshots           : TRNStats,
  headshotsPerRound   : TRNStats,
  headshotsPerMatch   : TRNStats,
  headshotsPerMinute  : TRNStats,
  headshotsPercentage : TRNStats,

  deaths              : TRNStats,
  deathsPerRound      : TRNStats,
  deathsPerMatch      : TRNStats,
  deathsPerMinute     : TRNStats,

  assists             : TRNStats,
  assistsPerMatch     : TRNStats,
  assistsPerRound     : TRNStats,
  assistsPerMinute    : TRNStats,

  kDRatio             : TRNStats,
  kDARatio            : TRNStats,
  kADRatio            : TRNStats,
  damage              : TRNStats,

  damagePerMatch      : TRNStats,
  damagePerRound      : TRNStats,
  damagePerMinute     : TRNStats,
  damageReceived      : TRNStats,

  plants              : TRNStats,
  plantsPerMatch      : TRNStats,
  plantsPerRound      : TRNStats,

  defuses             : TRNStats,
  defusesPerMatch     : TRNStats,
  defusesPerRound     : TRNStats,

  firstBloods         : TRNStats,
  firstBloodsPerMatch : TRNStats,

  grenadeCasts        : TRNStats,
  ability1Casts       : TRNStats,
  ability2Casts       : TRNStats,
  ultimateCasts       : TRNStats,

  dealtHeadshots      : TRNStats,
  dealtBodyshots      : TRNStats,
  dealtLegshots       : TRNStats,

  receivedHeadshots   : TRNStats,
  receivedBodyshots   : TRNStats,
  receivedLegshots    : TRNStats,

  deathsFirst         : TRNStats,
  deathsLast          : TRNStats,

  mostKillsInMatch    : TRNStats,
  mostKillsInRound    : TRNStats,

  flawless            : TRNStats,
  clutches            : TRNStats,
  thrifty             : TRNStats,
  aces                : TRNStats,
  teamAces            : TRNStats,

  attackKDRatio       : TRNStats,
  attackKills         : TRNStats,
  attackDeaths        : TRNStats,
  attackAssists       : TRNStats,
  attackRoundsPlayed  : TRNStats,
  attackRoundsWon     : TRNStats,
  attackRoundsLost    : TRNStats,
  attackRoundsWinPct  : TRNStats,

  defenseKDRatio      : TRNStats,
  defenseKills        : TRNStats,
  defenseDeaths       : TRNStats,
  defenseAssists      : TRNStats,
  defenseRoundsPlayed : TRNStats,
  defenseRoundsWon    : TRNStats,
  defenseRoundsLost   : TRNStats,
  defenseRoundsWinPct : TRNStats,

  rank                : TRNStats,
}
