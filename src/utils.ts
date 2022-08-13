import { EventType } from './models/event';

export const toMaskedEvent = (event: EventType) => {
  return {
    name: event.name,
    description: event.description,
    when: event.when || '',
    where: event.where || '',
    points: event.points,
    active: event.active,
  };
};
