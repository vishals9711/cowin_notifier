export interface DISTRICT_RESPONSE {
  districts: Array<DISTRICT>;
  ttl: 0;
}

export interface DISTRICT {
  state_id: number;
  district_id: number;
  district_name: string;
  district_name_l: string;
}
