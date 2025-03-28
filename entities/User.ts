import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SubscriptionPayment } from "./SubscriptionPayment";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  role?: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => SubscriptionPayment, (payment) => payment.subscription, {
    // Update the relation here
    cascade: true,
    eager: false,
  })
  subscriptionPayments?: SubscriptionPayment[];
}
