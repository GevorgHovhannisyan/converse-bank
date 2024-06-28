import { Icons } from "../../icons";

export const MIN_DEPOSIT = 100
export const MAX_DEPOSIT = 100_000_000

export const CURRENCY_ISO = {
  AMD: 'AMD',
  USD: 'USD',
  EUR: 'EUR',
};

export const DURATIONS = [
  {
    id: 1,
    value: 'months2',
    days: 60,
  },

  {
    id: 2,
    value: 'months6',
    days: 180,
  },
  {
    id: 3,
    value: 'months8',
    days: 240,
  },
  {
    id: 4,
    value: 'year1',
    days: 365,
  },
  {
    id: 5,
    value: 'year1_5',
    days: 548,
  },
  {
    id: 6,
    value: 'years2',
    days: 730,
  },
];


export const CURRENCIES = [
    {
        id: 1,
        currency: 'AMD',
        icon: <Icons.AMD/>
    },
    
    {
        id: 2,
        currency: 'USD',
        icon: <Icons.USD/>

    },
    {
        id: 3,
        currency: 'RUR',
        icon: <Icons.RUR/>

    },

]

export const DEPOSIT_TYPES = [
  {
    id: 1,
    value: 'profitable',
  },
  {
    id: 2,
    value: 'demanded',
  },
  {
    id: 3,
    value: 'custom',
  },
];