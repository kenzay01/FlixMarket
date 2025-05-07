import { DataSourceOptions } from "typeorm";
import path from "path";
import { User } from "./entities/User";
import { SubscriptionPayment } from "./entities/SubscriptionPayment";
import { Subscription } from "./entities/Subscription";
import { AddCzechLanguageAndCZKPrices1744200331630 } from "./migrations/1744200331630-AddCzechLanguageAndCZKPrices";
import { AddPolandLanguageAndPlnPrices1745200331630 } from "./migrations/1745200331630-AddPolandLanguageAndPlnPrices";

const config: DataSourceOptions = {
  type: "sqlite",
  database: path.join(process.cwd(), "database.sqlite"),
  synchronize: false,
  logging: false,
  entities: [User, SubscriptionPayment, Subscription],
  migrations: [
    AddCzechLanguageAndCZKPrices1744200331630,
    AddPolandLanguageAndPlnPrices1745200331630,
  ],
};

export default config;
