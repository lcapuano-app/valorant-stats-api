import { Query } from "@feathersjs/feathers";
import { ChatInputCommandInteraction, CacheType, EmbedBuilder, Colors } from "discord.js";
import app from "../../app";
import logger from "../../logger";
import { TRNProfile } from "../../types/tracker-api";
import { HandlerCommon } from "./handler-common";

export class StatsHandler extends HandlerCommon {

  static async reply( interaction: ChatInputCommandInteraction<CacheType> ): Promise<void> {
    const name = interaction.options.getString('nome');
    const tag = interaction.options.getString('tag');
    const embeds= await this.getEmbed( name as string, tag as string )

    await interaction.reply('Se tiver eu acho! As vezes demora um pouco...');
    await interaction.channel?.send({ embeds });
    return;
  }

  static async getEmbed( name: string, tag: string ): Promise<EmbedBuilder[]> {

    const query: Query = {
      riotId: `${name}#${tag}`,
      playlist: 'PROFILE'
    }

    const res = await app.services.tracker.find({ query }) as unknown as TRNProfile;

    if ( !res?.date )
      return [this.embedError( res.trackerProfile )];

    return this.embedSuccesss( res, res.trackerProfile );

  }

  static embedSuccesss( data: any, profileUrl: string ): EmbedBuilder[] {
    const stats = data?.segments?.[0].stats;

    const embedMain = new EmbedBuilder()
      .setTitle( data?.platformInfo?.platformUserHandle )
      .setColor( Colors.Blue )
     // .setImage( data?.platformInfo?.avatarUrl )
      .setAuthor({
        name: stats.rank?.metadata?.tierName,
        iconURL: stats.rank?.metadata?.iconUrl,
      })
      //.setThumbnail(data?.platformInfo?.avatarUrl)
      .addFields([
        { name: 'Tempo de jogo', value: stats?.timePlayed?.displayValue, inline: false },

        { name: 'Vitórias    ', value: stats?.matchesWon?.displayValue, inline: true },
        { name: 'Derrotas    ', value: stats?.matchesLost?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

        { name: 'Kills   ', value: stats?.kills?.displayValue, inline: true },
        { name: 'Por jogo', value: stats?.killsPerMatch?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

        { name: 'Deaths ', value: stats?.deaths?.displayValue, inline: true },
        { name: 'Por jogo', value: stats?.deathsPerMatch?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

        { name: 'Assists', value: stats?.assists?.displayValue, inline: true },
        { name: 'Por jogo', value: stats?.assistsPerMatch?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

        { name: 'Plants ', value: stats?.plants?.displayValue, inline: true },
        { name: 'Por jogo', value: stats?.plantsPerMatch?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

        { name: 'Defuses', value: stats?.defuses?.displayValue, inline: true },
        { name: 'Por jogo', value: stats?.defusesPerMatch?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

      ])
      .setFooter({
        text: profileUrl,
        iconURL: data?.platformInfo?.avatarUrl
      })

      const embedExtra =  new EmbedBuilder()
      .setColor( Colors.Blue )
      .setFields([
        { name: '1st blood', value: stats?.firstBloods?.displayValue, inline: true },
        { name: 'Sabotisse', value: stats?.deathsFirst?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

        { name: 'Aces    ', value: stats?.aces?.displayValue, inline: true },
        { name: 'Clutches', value: stats?.clutches?.displayValue, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },

        { name: 'Melhor Rank', value: stats?.peakRank?.metadata?.tierName, inline: true },
        { name: 'EP / ACT', value: stats?.peakRank?.metadata?.actName, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
      ])
      .setFooter({
        text: profileUrl,
        iconURL: data?.platformInfo?.avatarUrl
      });

    return [embedMain, embedExtra];
  }
}
