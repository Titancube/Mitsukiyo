import { ArgsOf, Discord, On } from "discordx";
import { DB } from "../plugins/db";

@Discord()
export abstract class WordCount {
  @On("messageCreate")
  private heUng([msg]: ArgsOf<"messageCreate">) {
    if (msg.content.includes("응애") || msg.content.includes("헤응")) {
      DB.write(msg.author.id);
    }
  }
}
