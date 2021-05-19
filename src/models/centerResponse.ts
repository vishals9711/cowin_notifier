export interface CENTER_RESPONSE {
  centers?: Array<CentersEntity> | null;
}
export interface CentersEntity {
  center_id: number;
  name: string;
  name_l: string;
  address: string;
  address_l: string;
  state_name: string;
  state_name_l: string;
  district_name: string;
  district_name_l: string;
  block_name: string;
  block_name_l: string;
  pincode: string;
  lat: number;
  long: number;
  from: string;
  to: string;
  fee_type: string;
  vaccine_fees?: Array<VaccineFeesEntity> | null;
  sessions?: Array<SessionsEntity> | null;
}
export interface VaccineFeesEntity {
  vaccine: string;
  fee: string;
}
export interface SessionsEntity {
  session_id: string;
  date: string;
  available_capacity: number;
  min_age_limit: number;
  vaccine: string;
  slots?: Array<string> | null;
}
