import dayjs from 'dayjs';
import { writable, type Writable } from 'svelte/store';

type Vault = {
  name: Writable<string>;
  address: Writable<string>;
  phone: Writable<string>;
  startDate: Writable<string>;
  cadence: Writable<string>;
  num: Writable<string>;
  customer: Writable<string>;
  project: Writable<string>;
  items: Writable<string>;
};

export type Item = {
  id: number;
  description: string;
  value: string;
};

const today = dayjs();
const middleOfMonth = Math.round(today.daysInMonth() / 2);

const store: Vault = {
  name: writable(localStorage.getItem('name') || 'Your Name'),
  address: writable(
    localStorage.getItem('address') || '63633 298th Ave\nMillville, MN\n55957, USA'
  ),
  phone: writable(localStorage.getItem('phone') || '+1 (102) 345-6789'),
  startDate: writable(
    localStorage.getItem('startDate') ||
      today.endOf('month').subtract(middleOfMonth, 'days').format('YYYY-MM-DD')
  ),
  cadence: writable(localStorage.getItem('cadence') || 'month'),
  num: writable(localStorage.getItem('num') || '0'),
  project: writable(localStorage.getItem('project') || 'ACME.app'),
  items: writable(localStorage.getItem('items') || '[]'),
  customer: writable(
    localStorage.getItem('customer') || 'Mocha Joe\n\n63633 298th Ave  \nMillville, MN\n55957, USA'
  )
};

for (let [name, writable] of Object.entries(store)) {
  writable.subscribe((value) => localStorage.setItem(name, value));
}

export default store;
