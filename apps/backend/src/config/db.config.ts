import { DataSource } from "typeorm/data-source/DataSource";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { User } from "../shared/entity/User";
import { SeederOptions } from "typeorm-extension/dist/seeder/type";

let connectionOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "kentadmin",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "kentdb",
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: ["src/db/migration/*{.ts,.js}"],
  migrationsRun: true,
  seeds: ["src/db/seed/**/*{.ts,.js}"],
  factories: ["src/db/factory/**/*{.ts,.js}"],
};

export default new DataSource({
  ...connectionOptions,
});
