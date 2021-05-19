import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../constants/paths';
import { DISTRICT_RESPONSE } from '../models/districts';

export async function getDistrictByState(
  stateId: number
): Promise<AxiosResponse<DISTRICT_RESPONSE>> {
  const url = API_BASE + `/v2/admin/location/districts/${stateId}`;
  return await axios.get<DISTRICT_RESPONSE>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
