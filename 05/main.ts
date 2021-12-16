import { example, input } from './input'

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

    public getVentLineCoords(): [number, number][] | undefined {
        if (this.startX === this.endX) {
            // Vertical line
            return Vent.pointsInBetween(this.startY, this.endY).map(y => [this.startX, y]);
        } else if (this.startY === this.endY) {
            // Horizontal line
            return Vent.pointsInBetween(this.startX, this.endX).map(x => [x, this.startY]);
        }
        return undefined;
    }

    static pointsInBetween(start: number, end: number) {
        let nums: number[] = [];

        if (end < start) {
            [start, end] = [end, start];
        }

        for (let i = start; i <= end; i++) {
            nums.push(i);
        }

        return nums;
    }
}

class CoordinateSystem {
    public navsystem: (number | null)[][];

    constructor(maxX: number, maxY: number) {
        this.navsystem = Array(maxY + 1).fill(Array(maxX + 1))
    }

    public addVent(x: number, y: number) {
        let val = this.navsystem[x][y] || 0;
        this.navsystem[x][y] = ++val;
    }
}


const vents: Vent[] = example.split('\n').map(line => new Vent(line))

// Find biggest x and y coordinates
const maxX = Math.max(...vents.map(vent => vent.endX), ...vents.map(vent => vent.startX))
const maxY = Math.max(...vents.map(vent => vent.endY), ...vents.map(vent => vent.startY))

const map = new CoordinateSystem(maxX, maxY);

while (vents.length > 0) {
    const currentVent = vents.shift();
    const ventline = currentVent?.getVentLineCoords()
    ventline?.forEach(coord => {
        if (coord) {
            map.addVent(...coord);
        }
    })
}

for (const line of map.navsystem) {
    for (const num of line) {
        process.stdout.write(num ? String(num) : '.')
    }
    process.stdout.write('\n')
}
