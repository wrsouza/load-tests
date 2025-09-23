import { DataSource } from "typeorm";
import { User } from "../entities";

export default new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  entities: [User],
  synchronize: true,
  logging: false,
  dropSchema: true,
});
