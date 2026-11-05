/**
 * Edit this file to personalise the invitation.
 * The date drives the countdown, the scratch card, and the footer.
 * Leave rsvpEndpoint empty to open a mail draft instead.
 * Leave instagram empty until you have a handle.
 */

export type Side = 'groom' | 'bride'

export type Celebration = {
  index: string
  title: string
  description: string
  time: string
  place: string
}

export type Note = {
  title: string
  text: string
}

const dateISO = '2027-02-14T18:00:00+05:30'
const when = new Date(dateISO)
const zone = 'Asia/Kolkata'

const dateDisplay = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: zone,
}).format(when)

export const wedding = {
  groom: {
    name: 'Dev',
    sideLabel: "Groom's side",
    familyLabel: "Dev's family",
    parents: ['Father of the Groom', 'Mother of the Groom'],
  },
  bride: {
    name: 'Prachi',
    sideLabel: "Bride's side",
    familyLabel: "Prachi's family",
    parents: ['Father of the Bride', 'Mother of the Bride'],
  },
  dateISO,
  dateDisplay,
  dateShort: dateDisplay.toUpperCase(),
  weekday: new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    timeZone: zone,
  }).format(when),
  city: 'Your City',
  venue: {
    name: 'The Wedding Venue',
    address: 'Address line, Your City',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Wedding+Venue',
  },
  invitation:
    'With joyful hearts, the families of Dev and Prachi request the pleasure of your company as they begin their life together.',
  blessing:
    'Two families, one joyful gathering. Your presence and blessings will make our celebration complete.',
  celebrationLede: 'Three gatherings, one beautiful beginning.',
  events: [
    {
      index: '01',
      title: 'Haldi',
      description: 'A morning of turmeric, laughter, and blessings.',
      time: '12:00 PM – 3:00 PM',
      place: 'The Wedding Venue',
    },
    {
      index: '02',
      title: 'Ring Ceremony',
      description: 'An evening to celebrate the promise of forever.',
      time: '7:00 PM – 10:00 PM',
      place: 'The Wedding Venue',
    },
    {
      index: '03',
      title: 'Varmala & Reception',
      description: 'Join us as we begin our next chapter together.',
      time: '6:00 PM – 10:00 PM',
      place: 'The Wedding Venue',
    },
  ] satisfies Celebration[],
  notes: [
    {
      title: 'Attire',
      text: 'Festive Indian wear. Maroon, ivory, gold, and soft pastels will look beautiful in the gathering.',
    },
    {
      title: 'The hour',
      text: 'Kindly arrive a little before each celebration begins, so we can start together.',
    },
    {
      title: 'The venue',
      text: 'The Wedding Venue, Your City. Each celebration carries a map link once you add the address.',
    },
    {
      title: 'Your presence',
      text: 'It is the gift we hope for. If you wish to send a blessing, leave a wish on this page.',
    },
  ] satisfies Note[],
  /** Formspree or any endpoint that accepts a JSON POST. */
  rsvpEndpoint: '',
  /** Used when rsvpEndpoint is empty. The guest's mail app opens a draft. */
  rsvpEmail: '',
  instagram: '',
  hashtag: 'DevWedsPrachi',
}

export function sideOf(value: Side) {
  return value === 'groom' ? wedding.groom : wedding.bride
}
