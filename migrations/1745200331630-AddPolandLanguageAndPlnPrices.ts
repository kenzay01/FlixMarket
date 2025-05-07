import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPolandLanguageAndPlnPrices1745200331630
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("subscriptions", [
      new TableColumn({
        name: "title_pl",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "description_pl",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "benefitsList_pl",
        type: "text", // Змінено з "simple-array" на "text"
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_month_pl",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_3months_pl",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_6months_pl",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_12months_pl",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("subscriptions", [
      "title_pl",
      "description_pl",
      "benefitsList_pl",
      "price_per_month_pl",
      "price_per_3months_pl",
      "price_per_6months_pl",
      "price_per_12months_pl",
    ]);
  }
}
