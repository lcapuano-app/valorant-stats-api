import { Interaction, CacheType } from 'discord.js'
import { REST, RequestData, Routes } from 'discord.js';
import app from '../app';
import logger from '../logger';
import { BotSlashCommand } from './discor-bot.types';
import { RankHandler } from './inter-handlers';
import { BOT_CMDS } from './slash-commands';

export class BotInteraction {

  static async setCommands() {
    //await this.deleteCommands();

    if ( !app?.discord?.rest )
      return;

    const rest: REST = app.discord.rest;
    const options: RequestData = { body: BOT_CMDS };
    const clientId: string = app.get('discordBot')?.clientId;

    if ( !clientId )
      return;

    try {
      const response =  await rest.put( Routes.applicationCommands(clientId), options );
      logger.info('Started refreshing application (/) commands.');
      //logger.info(JSON.stringify( response, null, 4 ));
    } catch (error) {
      logger.error( error );
    }
  }

  static async interact( interaction: Interaction<CacheType> ) {
    if ( !interaction.isChatInputCommand() )
      return;

    const cmdStr = interaction.commandName?.trim()
   // console.log('MAS NEM O PING?',interaction.commandName, interaction)

    switch ( cmdStr ) {
      case 'ping':
        await interaction.reply('Pong!');
        break;

      case 'rank':
        await RankHandler.reply( interaction );
        break;

      default:
        await interaction.reply('DEFAULT!');
        break;
    }

  }

  private static async deleteCommands() {

    if ( !app?.discord?.rest )
    return;

    const rest: REST = app.discord.rest;
    const clientId: string = app.get('discordBot')?.clientId;

    if ( !clientId )
      return;

    try {
      const cmds = await rest.get(Routes.applicationCommands(clientId) ) as BotSlashCommand[];
      const promises = cmds.map( cmd => rest.delete( Routes.applicationCommand( clientId, cmd?.id as string ) ) );
      await Promise.all( promises );
      logger.info('All slash commands has been removed')
    } catch (error) {
      logger.error( error )
    }
  }

}
