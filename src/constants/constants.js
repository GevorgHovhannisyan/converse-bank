export const DEPOSIT_TAX_RATE = 0.1; // deposit rate in portion, 0.1 means 10%
export const DAYS_IN_YEAR = 365;
export const DAYS_IN_MONTH = 30;
export const MONTHS_IN_YEAR = 12;
export const MIN_SAFE_POSITIVE = 0.00001;

const searchParams = new URLSearchParams(window.location.search);

export const debugMode = JSON.parse(searchParams.get('debug') || 'false');
