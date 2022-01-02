import {input, example} from './input';

let map: number[] = input.split(',').reduce((acc, curr) => {
  const val = Number(curr);
  acc[val] += 1;
  return acc;
}, Array(9).fill(0));


for (let i = 0; i < 256; i++) {
  const nextDay = Array(9).fill(0);
  for (let age = 8; age >= 0; age--) {
    const amount = map[age];

    if (age === 0) {
      nextDay[6] = nextDay[6] + amount;
      nextDay[8] = amount;
    } else {
      nextDay[age - 1] = amount;
    }
  }
  map = nextDay;
}

let sum = 0;
for (const age in map) {
  sum += map[age];
}
console.log(sum)