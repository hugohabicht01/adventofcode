import {input, example} from './input';

const data = input.split('\n').map(num => parseInt(num.trim()))

// First part, also used in the second part
const countIncrementations = (data: number[]) => {
  let incrementations = 0;
  let prev = data[0];

  for (const num of data) {
    if (num > prev) {
      incrementations += 1;
    }
    prev = num;
  }
  return incrementations;
}

const getThreeNumSlice = (data: number[], startindex: number): number[] => {
  return data.slice(startindex, startindex + 3)
}

// Solution to the second part
const secondPart = () => {
  let newNums: number[] = [];
  data.forEach((num, i) => {
    if (i + 2 >= data.length) return;
    const sum = getThreeNumSlice(data, i).reduce((prev, curr) => prev + curr)
    newNums.push(sum);
  })
  return countIncrementations(newNums);
}

console.log(secondPart())