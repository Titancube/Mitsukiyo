import * as fs from "fs";
import { Logger } from "../plugins/tools";

export interface IUserData {
  USER_ID: string;
  COUNT: number;
}

export interface IDatabase {
  users: [IUserData];
}

export class DB {
  static dataDirectory = `./data`;
  static dataFilename = `data.json`;
  static fullPath = `${this.dataDirectory}/${this.dataFilename}`;

  static init(userId: string) {
    try {
      if (!fs.existsSync(this.dataDirectory)) fs.mkdirSync(this.dataDirectory);
      if (!fs.existsSync(`${this.dataDirectory}/${this.dataFilename}`))
        fs.writeFileSync(
          `${this.dataDirectory}/${this.dataFilename}`,
          this.parse(userId)
        );
    } catch (error) {
      Logger.log("ERROR EXCEPTION", true);
      console.error(error);
    }
  }

  static parse(id: string, count?: number): string {
    const _JSON: IDatabase = {
      users: [
        {
          USER_ID: id,
          COUNT: count ?? 0,
        },
      ],
    };

    return JSON.stringify(_JSON);
  }

  static write(id: string) {
    this.init(id);
    try {
      const db: IDatabase = JSON.parse(fs.readFileSync(this.fullPath, "utf-8"));
      const user = db.users.filter((el) => el.USER_ID === id)[0];
      user
        ? user.COUNT++
        : db.users.push({
            USER_ID: id,
            COUNT: 1,
          });
      fs.writeFileSync(this.fullPath, JSON.stringify(db));
    } catch (error) {
      console.error(error);
    }
  }
}
