export type Subscription = {
  id: string;
  title?: string;
  title_de?: string;
  title_ua?: string;
  title_cs?: string;
  title_pl?: string;
  imageUrl?: string | null;
  imageFile?: File | string | null;
  benefitsList?: string[];
  benefitsList_de?: string[];
  benefitsList_ua?: string[];
  benefitsList_cs?: string[];
  benefitsList_pl?: string[];
  description?: string;
  description_de?: string;
  description_ua?: string;
  description_cs?: string;
  description_pl?: string;
  price_per_month?: number | null;
  price_per_month_eu?: number | null;
  price_per_month_ua?: number | null;
  price_per_month_cz?: number | null; // Added for CZK
  price_per_month_pl?: number | null; // Added for PLN
  price_per_3months?: number | null;
  price_per_3months_eu?: number | null;
  price_per_3months_ua?: number | null;
  price_per_3months_cz?: number | null; // Added for CZK
  price_per_3months_pl?: number | null; // Added for PLN
  price_per_6months?: number | null;
  price_per_6months_eu?: number | null;
  price_per_6months_ua?: number | null;
  price_per_6months_cz?: number | null; // Added for CZK
  price_per_6months_pl?: number | null; // Added for PLN
  price_per_12months?: number | null;
  price_per_12months_eu?: number | null;
  price_per_12months_ua?: number | null;
  price_per_12months_cz?: number | null; // Added for CZK
  price_per_12months_pl?: number | null; // Added for PLN
  regions?: string[];
  // duration?: string;
  // endDate?: string;
  // localizedTitle?: string;
};
