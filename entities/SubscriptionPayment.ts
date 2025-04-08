import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Subscription } from "./Subscription";

@Entity()
export class SubscriptionPayment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: "date", nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  endDate?: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ nullable: true })
  locale?: string;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments, {
    onDelete: "CASCADE",
    eager: false,
  })
  subscription: Subscription;
}
