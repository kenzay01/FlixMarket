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

  @Column({ nullable: true })
  imageUrl?: string;

<<<<<<< HEAD
<<<<<<< HEAD
  @Column({ nullable: true })
  imageFile?: string;

=======
>>>>>>> 75318fb (done admin subscrioption)
=======
  @Column({ nullable: true })
  imageFile?: string;

>>>>>>> f6752e1 (done loading images from admin page)
  @Column("simple-array", { nullable: true })
  benefitsList?: string[];

  @Column("simple-array", { nullable: true })
  benefitsList_de?: string[];

  @Column("simple-array", { nullable: true })
  benefitsList_ua?: string[];

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  description_de?: string;

  @Column({ nullable: true })
  description_ua?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_month_ua?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_3months?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_3months_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_3months_ua?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_6months?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_6months_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_6months_ua?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_12months?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_12months_eu?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_12months_ua?: number;

  @Column("simple-array", { nullable: true })
  regions?: string[];

  @OneToMany(() => SubscriptionPayment, (payment) => payment.subscription)
  payments: SubscriptionPayment[];
}
