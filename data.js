// The fictional news day this edition sums up. Every string here is illustrative
// content for the make.fun "news in one image" bounty; it is not reporting.
export const edition = {
  name: "The World in One Day",
  number: 331,
  weekday: "Friday",
  date: "27 November 2026",
  note: "Illustrative edition · synthetic wire digest, not reporting",
};

// Eight stories get room on the page. `status` says what kind of evidence the
// line rests on, which is shown next to every headline.
export const stories = [
  {
    region: "Middle East",
    field: "Security",
    time: "03:40",
    status: "Reported",
    lead: true,
    headline: "Two Italians killed in a drone strike on a Kuwait oil terminal",
    deck: "Loadings stopped for four hours at the Shuaiba terminal and exports resumed before dawn, a person briefed on the closure said. No group has said it fired the drone.",
  },
  {
    region: "Americas",
    field: "Retail",
    time: "21:00",
    status: "Company data",
    headline: "Black Friday online sales reach $12.9bn in a single day",
    deck: "Trackers counted 126 million buyers and an average discount of 28%.",
  },
  {
    region: "Middle East",
    field: "Diplomacy",
    time: "18:20",
    status: "Official",
    headline: "Hamas weighs its reply after 10 killed in Gaza strikes",
    deck: "Mediators in Doha said a 72-hour pause was back on the table.",
  },
  {
    region: "Europe",
    field: "Politics",
    time: "15:30",
    status: "Official",
    headline: "Berlin's coalition survives its budget by four seats",
    deck: "The transport levy stays; the climate fund is trimmed by €2bn.",
  },
  {
    region: "Asia",
    field: "Industry",
    time: "00:50",
    status: "Official",
    headline: "Japan's factory output falls a third month as exports cool",
  },
  {
    region: "Africa",
    field: "Energy",
    time: "00:05",
    status: "Official",
    headline: "Kenya ends its fuel subsidy, and pump prices rise 12%",
  },
  {
    region: "Oceania",
    field: "Politics",
    time: "02:00",
    status: "Official",
    headline: "Special votes add 400,000 ballots to New Zealand's count",
  },
  {
    region: "Americas",
    field: "Politics",
    time: "19:45",
    status: "Official",
    headline: "Argentina's Senate passes a trimmed spending package",
  },
];

// Eight shorter lines, one per row, below the cards.
export const briefs = [
  { region: "Africa", field: "Diplomacy", time: "08:05", status: "Official", headline: "Nile talks resume in Cairo" },
  { region: "Global", field: "Climate", time: "06:10", status: "Official", headline: "Loss-and-damage timetable agreed at dawn" },
  { region: "Europe", field: "Tech", time: "09:20", status: "Official", headline: "EU opens file on model-training data" },
  { region: "Americas", field: "Economy", time: "10:40", status: "Official", headline: "Chile's copper output rises" },
  { region: "Middle East", field: "Energy", time: "11:15", status: "Reported", headline: "Tanker clears Hormuz after six days" },
  { region: "Asia", field: "Weather", time: "04:15", status: "Official", headline: "Typhoon warning lifted in the Philippines" },
  { region: "Europe", field: "Transport", time: "07:30", status: "Reported", headline: "France's rail strike ends after 52 hours" },
  { region: "Global", field: "Sport", time: "17:00", status: "Official", headline: "World Cup draw: holders meet two debutants" },
];
