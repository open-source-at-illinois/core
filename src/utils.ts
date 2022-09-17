import { EventType } from './models/event';

import moment from 'moment-timezone';
export interface MaskedEventType {
  name: string;
  description: string;
  when: string;
  where: string;
  points: number;
  active: boolean;
}

export const toMaskedEvent = (event: EventType): MaskedEventType => {
  return {
    name: event.name,
    description: event.description,
    when: event.when || '',
    where: event.where || '',
    points: event.points,
    active: event.active,
  };
};

export const sortEventsChronologically = (
  a: MaskedEventType,
  b: MaskedEventType
) => {
  const DATE_FORMAT = 'MMM DD hh:mm A';

  const mom_a = moment(a.when, DATE_FORMAT, true);
  const mom_b = moment(b.when, DATE_FORMAT, true);

  if (!mom_a.isValid() || !mom_b.isValid()) {
    return 0;
  }

  return mom_a.isAfter(mom_b) ? 1 : -1;
};
