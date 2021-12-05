import { example, input } from "./input";

let data = input.split("\n");

let gamma = [];
let epsilon = [];

for (let i = 0;i < data[0].length;i++) {
  const bits = data.map(line => line[i])
  const mostSignificantBit = bits.filter(bit => bit === "1").length > bits.filter(bit => bit === "0").length ? '1' : '0';
  const leastSignificantBit = bits.filter(bit => bit === "1").length < bits.filter(bit => bit === "0").length ? '1' : '0';
  gamma.push(mostSignificantBit);
  epsilon.push(leastSignificantBit);
}

const power = parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
console.log(power);