import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SubscriptionPayment } from "./SubscriptionPayment";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  title_de?: string;

  @Column({ nullable: true })
  title_ua?: string;

  @Column("simple-array", { nullable: true })
  benefitsList?: string[];

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month?: number;

  @OneToMany(() => SubscriptionPayment, (payment) => payment.subscription, {
    cascade: ["insert", "update"],
    eager: false,
  })
  payments?: SubscriptionPayment[];
}
