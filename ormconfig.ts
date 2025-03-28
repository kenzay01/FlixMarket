import { DataSourceOptions } from "typeorm";
import path from "path";
import { User } from "./entities/User";
import { SubscriptionPayment } from "./entities/SubscriptionPayment";
import { Subscription } from "./entities/Subscription";

const config: DataSourceOptions = {
  type: "sqlite",
  database: path.join(process.cwd(), "database.sqlite"),
  synchronize: true,
  logging: false,
  entities: [User, SubscriptionPayment, Subscription],
  //   migrations: [path.join(process.cwd(), "/migrations/**/*.ts")],
  //   subscribers: [path.join(process.cwd(), "/subscribers/**/*.ts")],
};

export default config;
