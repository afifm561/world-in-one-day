// Friday 27 November 2026, read at 08:14 UTC. Every headline is quoted as its
// outlet published it, and `source` is that outlet. A time starting with "~" is one
// the outlet printed as a relative stamp or without a zone, converted to UTC; a null
// time is a story the outlet dated and printed no clock time for.
export const edition = {
  name: "The World in One Day",
  weekday: "Friday",
  date: "27 November 2026",
  compiled: "08:14",
  note: "Headlines as published by the outlets named",
};

export const stories = [
  {
    region: "Europe",
    field: "Diplomacy",
    time: "~07:21",
    source: "Reuters",
    lead: true,
    headline: "Trump says he asked Putin to 'pull back' military aggression throughout Europe",
    deck: "President Donald Trump said he told Vladimir Putin last week he would like to see Russia pull back on military aggression against territories throughout Europe, in the hope it could lead to a quick settlement of the war in Ukraine.",
  },
  {
    region: "Americas",
    field: "Weather",
    time: "~07:14",
    source: "France 24",
    headline: "Almost a million Americans left without power on Thanksgiving as storm sweeps East Coast",
    deck: "A powerful storm knocked out power to nearly a million customers as gusts of up to 112km/h toppled trees and lines, and New York postponed the Macy's parade.",
  },
  {
    region: "Middle East",
    field: "Politics",
    time: "~06:46",
    source: "France 24",
    headline: "Israel's Eisenkot agrees to a coalition deal with the left-wing Democrats",
    deck: "The centrist party of former military chief Gadi Eisenkot and Yair Golan's Democrats struck the deal on Thursday, after October's election left no bloc with a majority.",
  },
  {
    region: "Africa",
    field: "Security",
    time: null,
    source: "Al Jazeera",
    headline: "At least 13 Niger soldiers killed in an armed attack at Sanam",
    deck: "Niger's defence ministry said 13 members of the National Guard were killed and 20 wounded at their compound in the west of the country, near the Mali border. No group has said it fired.",
  },
  {
    region: "Asia",
    field: "Economy",
    time: "~07:22",
    source: "Reuters",
    headline: "China's industrial profit growth fastest in five months",
  },
  {
    region: "Middle East",
    field: "Security",
    time: "~06:00",
    source: "BBC",
    headline: "Inside Saudi Arabia, Houthi attacks test the kingdom's image of security",
  },
  {
    region: "Americas",
    field: "Politics",
    time: "~06:00",
    source: "BBC",
    headline: "Venezuela to scrap the law that bars opposition from public office",
  },
  {
    region: "Oceania",
    field: "Politics",
    time: "~03:00",
    source: "DW",
    headline: "New Zealand's election ends in a hung parliament",
  },
];

export const briefs = [
  { region: "Africa", field: "Justice", time: "~00:39", source: "PUNCH", headline: "Lagos court orders pastor Jimmy Odukoya's arrest over contempt" },
  { region: "Africa", field: "Politics", time: "~07:13", source: "France 24", headline: "In Central African Republic, Wagner muscles in on daily life" },
  { region: "Asia", field: "Society", time: "~04:54", source: "Reuters", headline: "The search for Vietnam's stolen pets at wet markets" },
  { region: "Asia", field: "Technology", time: "~07:08", source: "Reuters", headline: "India's election body fixes a website flaw that exposed voter data" },
  { region: "Europe", field: "Energy", time: "~07:00", source: "Reuters", headline: "US pushed Venezuela and Iraq to consider leaving OPEC" },
  { region: "Americas", field: "Retail", time: "~07:00", source: "Reuters", headline: "Cautious consumers gear up for Black Friday as inflation bites" },
  { region: "Asia", field: "Politics", time: "07:20", source: "AP", headline: "Meet the mayoral candidate in Taiwan who China has sanctioned" },
  { region: "Asia", field: "Culture", time: null, source: "Al Jazeera", headline: "Indians embrace Pakistani dramas, defying a ban" },
];
