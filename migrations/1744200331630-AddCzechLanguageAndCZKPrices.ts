import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCzechLanguageAndCZKPrices1744200331630
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("subscriptions", [
      new TableColumn({
        name: "title_cs",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "description_cs",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "benefitsList_cs",
        type: "text", // Змінено з "simple-array" на "text"
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_month_cz",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_3months_cz",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_6months_cz",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "price_per_12months_cz",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("subscriptions", [
      "title_cs",
      "description_cs",
      "benefitsList_cs",
      "price_per_month_cz",
      "price_per_3months_cz",
      "price_per_6months_cz",
      "price_per_12months_cz",
    ]);
  }
}
