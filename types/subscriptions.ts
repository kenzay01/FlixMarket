export type Subscription = {
  id: string;
  title?: string;
  title_de?: string;
  imageUrl?: string;
  benefitsList?: string[];
  benefitsList_de?: string[];
  description?: string;
  description_de?: string;
  price_per_month?: number | null;
  price_per_month_eu?: number | null;
  price_per_3months?: number | null;
  price_per_3months_eu?: number | null;
  price_per_6months?: number | null;
  price_per_6months_eu?: number | null;
  price_per_12months?: number | null;
  price_per_12months_eu?: number | null;
};
