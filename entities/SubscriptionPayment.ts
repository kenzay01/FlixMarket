import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("subscription_payments")
export class SubscriptionPayment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ type: "date", nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  endDate?: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ nullable: true })
  locale?: string;

  @Column({ nullable: true })
  invoiceId?: string;

  @Column({ nullable: true })
  duration?: string;

  @Column({ nullable: true })
  subscriptionId: string;
}
