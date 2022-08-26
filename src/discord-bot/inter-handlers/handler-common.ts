import { EmbedBuilder, Colors } from "discord.js";
import { HenrikApiRankResData } from "../../types/henrik-api";

export class HandlerCommon {

  static embedError( profileUrl: string ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle('Não consegui achar seu ranking')
      .setDescription('Talvez o tracker.gg não tenha permissão de pegar os seus dados.')
      .setColor( Colors.Blue )
      .setFooter({ text: profileUrl });

    return embed;
  }

  static embedSuccess( data: HenrikApiRankResData, profileUrl: string ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle( data?.name )
      .setURL( profileUrl )
      .setAuthor({
        name: `${data?.currenttierpatched} (${data?.ranking_in_tier})`,
        iconURL: data?.images?.large
      })
      .setFooter({ text: profileUrl });

    return embed;
  }

}
