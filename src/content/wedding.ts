/**
 * Edit this file to personalise the invitation.
 * The date drives the countdown, the scratch card, and the footer.
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

const dateISO = '2026-12-02T18:00:00+05:30'
const when = new Date(dateISO)
const zone = 'Asia/Kolkata'

const dateDisplay = '2nd Dec 2026'

export const wedding = {
  groom: {
    name: 'Dev Ashish Shukla',
    sideLabel: "Groom's side",
    familyLabel: "Dev Ashish Shukla's family",
    parents: ['Yogesh Kumar Shukla', 'Sushma Shukla'],
  },
  bride: {
    name: 'Prachi Shukla',
    sideLabel: "Bride's side",
    familyLabel: "Prachi Shukla's family",
    parents: ['Pradeep Kumar Shukla', 'Anita Shukla'],
  },
  dateISO,
  dateDisplay,
  dateShort: dateDisplay.toUpperCase(),
  weekday: new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    timeZone: zone,
  }).format(when),
  city: 'Kanpur',
  venue: {
    name: 'MVR Grand Hotel',
    address: 'Venue : MVR Grand Hotel, Juhi Kalan, Saket Nagar, Kanpur',
    mapUrl: 'https://maps.app.goo.gl/iPkiN8Xg1a4tAmi59',
  },
  invitation:
    'With joyful hearts, the families of Dev Ashish Shukla and Prachi Shukla request the pleasure of your company as they begin their life together.',
  blessing:
    'Two families, one joyful gathering. Your presence and blessings will make our celebration complete.',
  celebrationLede: 'Three gatherings, one beautiful beginning.',
  events: [
    {
      index: '01',
      title: 'Variksha/Tilak',
      description: "Tilak Isn't just a ritual, It's a promise of love forever",
      time: '3:00 PM – 5:00 PM',
      place: 'MVR Grand Hotel',
    },
    {
      index: '02',
      title: 'Shubh Vivah/Varmala',
      description: 'An evening to celebrate the promise of forever.',
      time: '7:00 PM – 10:00 PM',
      place: 'MVR Grand Hotel',
    },
    {
      index: '03',
      title: 'Vadhu Aagman',
      description: 'Join us as we begin our next chapter together.',
      time: '9:00 AM',
      place: 'MVR Grand Hotel',
    },
  ] satisfies Celebration[],
  notes: [
    {
      title: 'Attire',
      text: 'Any best that suits your charming personality : )',
    },
    {
      title: 'The hour',
      text: 'Kindly arrive a little before each celebration begins, so we can start together.',
    },
    {
      title: 'The venue',
      text: 'MVR Grand Hotel, Juhi Kalan, Saket Nagar, Kanpur. Each celebration carries a map link.',
    },
    {
      title: 'Your presence',
      text: 'It is the gift we hope for. If you wish to send a blessing, leave a wish on this page.',
    },
  ] satisfies Note[],
  instagram: '',
  hashtag: 'DevWedsPrachi',
  /**
   * Google Sheet guestbook. Paste the Apps Script web app URL that ends in /exec.
   * Leave this empty and wishes stay in each guest's own browser.
   * The script to deploy is scripts/guestbook.gs.
   */
  wishesUrl:
    'https://script.google.com/macros/s/AKfycbyAJJTwfKd1BMZ00ixzf5XUC6d6vdl6YwkWHeoaCEi17SRLnCUsndF-8d49b3YFkljElQ/exec',
}

export function sideOf(value: Side) {
  return value === 'groom' ? wedding.groom : wedding.bride
}
