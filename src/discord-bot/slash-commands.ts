import { SlashCommandBuilder, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';

const PING = new SlashCommandBuilder().setName('ping').setDescription('Reponde com pong!');
const RANKING = new SlashCommandBuilder()
                  .setName('rank')
                  .setDescription('Mostra seu ranking atual')
                  .addStringOption( option => option.setName('nome').setDescription('Ex: Q95 Madru').setRequired(true) )
                  .addStringOption( option => option.setName('tag').setDescription('Ex: Quake').setRequired(true) );

export const BOT_CMDS: RESTPostAPIApplicationCommandsJSONBody[] = [
  PING,
  RANKING
].map(command => command.toJSON());
