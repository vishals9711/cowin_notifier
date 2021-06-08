import { FEES_VACCINE_ARRAY } from '../../constants/constants';
import { SLOT_ALERTS } from '../../models/slot';

export const returnType = (alert: SLOT_ALERTS): number => {
  const {
    fees = ['Paid', 'Free'],
    vaccine = ['COVAXIN', 'COVISHIELD'],
  } = alert;
  const index = FEES_VACCINE_ARRAY.findIndex((arr) => {
    const feesAlert = fees.sort();
    const vaccineAlert = vaccine.sort();
    return (
      arr.fees.sort().toString() === feesAlert.toString() &&
      arr.vaccine.sort().toString() === vaccineAlert.toString()
    );
  });
  return index;
};

export const returnIfSameSlot = (
  alert1: SLOT_ALERTS,
  alert2: SLOT_ALERTS
): boolean => {
  return returnType(alert1) === returnType(alert2);
};
