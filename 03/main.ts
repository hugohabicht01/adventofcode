import { example, input } from "./input";

let data = input.split("\n");

let gamma = [];
let epsilon = [];

const findBits = (data: string[], index: number) => {
  const bits = data.map(line => line[index]);
  const mostSignificantBit = bits.filter(bit => bit === '1').length >= bits.filter(bit => bit === '0').length ? '1' : '0';
  const leastSignificantBit = bits.filter(bit => bit === '0').length <= bits.filter(bit => bit === '1').length ? '0' : '1';
  return [mostSignificantBit, leastSignificantBit];
}

// Part 1
// for (let i = 0; i < data[0].length; i++) {
//   const bits = data.map(line => line[i])
//   const mostSignificantBit = bits.filter(bit => bit === "1").length > bits.filter(bit => bit === "0").length ? '1' : '0';
//   const leastSignificantBit = bits.filter(bit => bit === "1").length < bits.filter(bit => bit === "0").length ? '1' : '0';
//   gamma.push(mostSignificantBit);
//   epsilon.push(leastSignificantBit);
// }

// const power = parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
// console.log(power);

let oxygenData = data.slice();
let co2Data = data.slice();

for (let i = 0; i < data[0].length; i++) {
  if (oxygenData.length > 1) {
    const [most,] = findBits(oxygenData, i);
    oxygenData = oxygenData.filter(line => line[i] === most);
  }
  if (co2Data.length > 1) {
    const [, least] = findBits(co2Data, i);
    co2Data = co2Data.filter(line => line[i] === least);
  }
}

const result = parseInt(oxygenData[0], 2) * parseInt(co2Data[0], 2);
console.log(result);
