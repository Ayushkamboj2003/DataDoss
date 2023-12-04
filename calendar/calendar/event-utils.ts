import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const TOMORROW_STR = tomorrow.toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today


export const INITIAL_EVENTS: EventInput[] = [

  {
    id: createEventId(),
    title: '236/2023',
    start: TODAY_STR + 'T06:00:00',
    end: TODAY_STR + 'T13:35:00',
    backgroundColor: '#08af08',
    extendedProps: {
        type: 'working',
        articoleimg: '/assets/images/art1.png',
        setupvideo: '/assets/video/video.mp4',
        itemCode: 'OR 12,5 X 3,5',
        totalitems: 150000,
      },
  },
  {
    id: createEventId(),
    title: 'Attrezzaggio - Commessa 329/2023 - OR 9,5 X 1,5',
    start: TODAY_STR + 'T13:50:00',
    end: TODAY_STR + 'T14:20:00',
    backgroundColor: '#FFF',
    extendedProps: {
        type: 'setup',
      },
  },

  {
    id: createEventId(),
    title: '329/2023',
    start: TODAY_STR + 'T14:35:00',
    end: TODAY_STR + 'T18:55:00',
    backgroundColor: '#08af08',
    extendedProps: {
        type: 'working',
        articoleimg: '/assets/images/art2.png',
        setupvideo: '/assets/video/video.mp4',
        itemCode: 'OR 12,5 X 3,5',
        totalitems: 150000,
      },
  },
  {
    id: createEventId(),
    title: 'Manutenzione - Pulizia Filtri',
    start: TODAY_STR + 'T19:10:00',
    end: TODAY_STR + 'T21:30:00',
    backgroundColor: '#ffa500',
    extendedProps: {
        type: 'manutenzione',
      },
  },
  {
    id: createEventId(),
    title: '329/2023',
    start: TOMORROW_STR + 'T06:00:00',
    end: TOMORROW_STR + 'T14:55:00',
    backgroundColor: '#08af08',
    extendedProps: {
        type: 'working',
        articoleimg: '/assets/images/art2.png',
        setupvideo: '/assets/video/video.mp4',
        itemCode: 'OR 12,5 X 3,5',
        totalitems: 150000,
      },
  },
  {
    id: createEventId(),
    title: 'Attrezzaggio - Commessa 251/2023 - OR 12,5 X 3,5',
    start: TOMORROW_STR + 'T15:10:00',
    end: TOMORROW_STR + 'T15:40:00',
    backgroundColor: '#DAA520',
    extendedProps: {
        type: 'setup',
      },
  },
  {
    id: createEventId(),
    title: '251/2023',
    start: TOMORROW_STR + 'T15:45:00',
    end: TOMORROW_STR + 'T22:00:00',
    backgroundColor: '#08af08',
    extendedProps: {
        type: 'working',
        articoleimg: '/assets/images/art1.png',
        setupvideo: '/assets/video/video.mp4',
        itemCode: 'OR 12,5 X 3,5',
        totalitems: 250000,
      },
  },


];

export function createEventId() {
  return String(eventGuid++);
}