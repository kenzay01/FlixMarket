import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SubscriptionPayment } from "./SubscriptionPayment";

@Entity("subscriptions")
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  title_de?: string;

  @Column({ nullable: true })
  title_ua?: string;

  @Column({ nullable: true })
  title_cs?: string; // Додано для чеської мови

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  imageFile?: string;

  @Column("simple-array", { nullable: true })
  benefitsList?: string[];

  @Column("simple-array", { nullable: true })
  benefitsList_de?: string[];

  @Column("simple-array", { nullable: true })
  benefitsList_ua?: string[];

  @Column("simple-array", { nullable: true })
  benefitsList_cs?: string[]; // Додано для чеської мови

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  description_de?: string;

  @Column({ nullable: true })
  description_ua?: string;

  @Column({ nullable: true })
  description_cs?: string; // Додано для чеської мови

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month_ua?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month_cz?: number; // Додано для CZK

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_3months?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_3months_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_3months_ua?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_3months_cz?: number; // Додано для CZK

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_6months?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_6months_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_6months_ua?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_6months_cz?: number; // Додано для CZK

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_12months?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_12months_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_12months_ua?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_12months_cz?: number; // Додано для CZK

  @Column("simple-array", { nullable: true })
  regions?: string[];

  // @OneToMany(() => SubscriptionPayment, (payment) => payment.subscription)
  // payments: SubscriptionPayment[];
}
