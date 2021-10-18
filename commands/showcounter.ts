import { CommandInteraction, GuildMember } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import * as fs from "fs";
import { DB, IDatabase } from "../plugins/db";

@Discord()
export abstract class ShowCounter {
  @Slash("응애", { description: "헤응/응애 카운터" })
  private async showCounter(
    @SlashOption("user", { type: "USER", required: true })
    user: GuildMember | undefined,
    interaction: CommandInteraction
  ): Promise<void> {
    const id = user.id;
    if (id) {
      const name = user.displayName;
      const db: IDatabase = JSON.parse(fs.readFileSync(DB.fullPath, "utf-8"));
      const userFromDB = db.users.filter((el) => el.USER_ID === id)[0];
      if (userFromDB) {
        interaction.reply({
          content: `${name} 눈나의 헤응/응애 카운터 : ${userFromDB.COUNT}`,
          ephemeral: false,
        });
      } else {
        interaction.reply({ content: "몰?루", ephemeral: true });
      }
    } else {
      interaction.reply({ content: "몰?루", ephemeral: true });
    }
  }
}
