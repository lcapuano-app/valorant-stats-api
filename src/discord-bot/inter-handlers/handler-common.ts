import { EmbedBuilder, Colors } from "discord.js";

export class HandlerCommon {

  static embedError( profileUrl: string ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle('Não consegui achar seu ranking')
      .setDescription('Talvez o tracker.gg não tenha permissão de pegar os seus dados.')
      .setColor( Colors.Blue )
      .setFooter({ text: profileUrl });

    return embed;
  }

}
