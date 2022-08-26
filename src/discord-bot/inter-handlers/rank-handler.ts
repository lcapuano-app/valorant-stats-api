import { Query } from "@feathersjs/feathers";
import { CacheType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import app from "../../app";
import logger from "../../logger";
import { HerikApiRes, HenrikApiRankResData } from "../../types/henrik-api";
import { HandlerCommon } from "./handler-common";

export class RankHandler extends HandlerCommon {

  static async reply( interaction: ChatInputCommandInteraction<CacheType> ): Promise<void> {
    const name = interaction.options.getString('nome');
    const tag = interaction.options.getString('tag');
    const embed = await this.getEmbed( name as string, tag as string )
    await interaction.reply('Se tiver eu acho! As vezes demora um pouco...');
    await interaction.channel?.send({ embeds: [ embed ]}).catch( async err => {
      logger.error( err )
      return await interaction.reply('Deu pau')
    });
    return;
  }

  static async getEmbed( name: string, tag: string ): Promise<EmbedBuilder> {

    const query: Query = { riotId: `${name}#${tag}` }
    const res = await app.services.henrik.find({ query }) as unknown as HerikApiRes<HenrikApiRankResData>;

    if ( res?.status != 200 )
      return this.embedError( res.trackerProfile );

    return this.embedSuccess( res.data, res.trackerProfile );

  }
}
