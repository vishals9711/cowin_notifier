export interface SLOT_ALERTS {
  state_id: number;
  district_id: number;
  district_name: string;
  state_name: string;
  age_category: number;
  date_created: number;
  date_updated?: string;
  available?: boolean;
  fees?: string[];
  vaccine?: string[];
}
