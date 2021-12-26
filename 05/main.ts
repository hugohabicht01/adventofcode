import { example, input } from './input'
import util from 'util';

class Vent {
    public startX: number;
    public startY: number;
    public endX: number;
    public endY: number

    // Sample input: 4,9 -> 3,9
    constructor(input: string) {
        // Remove all whitespace, then split into start and end coordinates
        const [startpoints, endpoints] = input.replace(/\s+/g, '').split('->')
        const [startX, startY] = startpoints.split(',').map(Number)
        const [endX, endY] = endpoints.split(',').map(Number)

        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    public getVentLineCoords(): [number, number][] {
        if (this.startX === this.endX) {
            // Vertical line
            return Vent.pointsInBetween(this.startY, this.endY).map(y => [this.startX, y]) as [number, number][];
        } else if (this.startY === this.endY) {
            // Horizontal line
            return Vent.pointsInBetween(this.startX, this.endX).map(x => [x, this.startY]) as [number, number][];
        }
        const xPoints = Vent.pointsInBetween(this.startX, this.endX, true);
        const yPoints = Vent.pointsInBetween(this.startY, this.endY, true)
        return Vent.zip(xPoints, yPoints) as [number, number][];
    }

    static pointsInBetween(start: number, end: number, preserveDirection: boolean = false) {
        let nums: number[] = [];

        if (end < start) {
            if (preserveDirection) {
                for (let i = start; i >= end; i--) {
                    nums.push(i);
                }
                return nums;
            }

            [start, end] = [end, start];
        }

        for (let i = start; i <= end; i++) {
            nums.push(i);
        }

        return nums;
    }

    static zip(nums: number[], nums2: number[]) {
        return nums.map((num, i) => [num, nums2[i]])
    }
}

class CoordinateSystem {
    public navsystem: (number | null)[][];

    constructor(maxX: number, maxY: number) {
        // This needs to be a deep copy, otherwise writing to it will write to not only the coord but also other places...
        this.navsystem = JSON.parse(JSON.stringify(Array(maxY + 1).fill(Array(maxX + 1).fill(null))));
    }

    public addVent(x: number, y: number) {
        let val = this.navsystem[y][x];
        if (!val) {
            val = 0
        }
        this.navsystem[y][x] = ++val;
    }

    [util.inspect.custom]() {
        return this.navsystem.map(row => row.map(num => !!num ? String(num) : '.').join(' ')).join('\n');
    }
}


const vents: Vent[] = input.split('\n').map(line => new Vent(line))

// Find biggest x and y coordinates
const maxX = Math.max(...vents.map(vent => vent.endX), ...vents.map(vent => vent.startX))
const maxY = Math.max(...vents.map(vent => vent.endY), ...vents.map(vent => vent.startY))

const map = new CoordinateSystem(maxX, maxY);
while (vents.length > 0) {
    const currentVent = vents.shift();
    const ventline = currentVent?.getVentLineCoords()
    if (ventline) {
        ventline.forEach(coord => {
            if (coord) {
                map.addVent(...coord);
            }
        })
    }
}

// Find the solution, the total number of points where atleast 2 vents overlap
let count = 0;
for (const row of map.navsystem) {
    for (const point of row) {
        if (point && point > 1) {
            count++;
        }
    }
}


console.log(count)