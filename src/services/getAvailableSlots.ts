import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../constants/paths';
import { CENTER_RESPONSE } from '../models/centerResponse';

export async function getAvailableSlots(
  district_id: number
): Promise<AxiosResponse<CENTER_RESPONSE>> {
  const url = API_BASE + `/v2/appointment/sessions/public/calendarByDistrict`;
  const date = new Intl.DateTimeFormat('en-IN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
    .format(new Date())
    .replaceAll('/', '-');
  return await axios.get<CENTER_RESPONSE>(url, {
    params: {
      district_id,
      date,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
