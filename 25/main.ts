import {example, input} from './input';
import util from 'util';

enum seacucumber {
    empty = '.',
    east = '>',
    south = 'v'
}

class Seabed {
    public map: seacucumber[][];
    public nextMap: seacucumber[][]

    constructor(input: string) {
        const initialState = input.split('\n').map(line => line.split(''));

        this.map = Array.from({length: initialState.length}, e => Array(initialState[0].length).fill(seacucumber.empty));

        for (const [yIndex, line] of initialState.entries()) {
            for (const [xIndex, cucumber] of line.entries()) {
                this.map[yIndex][xIndex] = cucumber as seacucumber;
            }
        }
        this.nextMap = JSON.parse(JSON.stringify(this.map));
    }

    runCycle(): number {
        let seacucumbersMoved = 0;
        // The seacucumber moving to the right move first, then the ones moving south
        for (const [yIndex, line] of this.map.entries()) {
            for (const [xIndex, cucumber] of line.entries()) {
                if (cucumber !== seacucumber.east) continue;
                    if (this.canMove(xIndex, yIndex)) {
                        this.nextMap[yIndex][xIndex] = seacucumber.empty;
                        let x = xIndex + 1;
                        if (x >= this.map[yIndex].length) {
                            x = 0;
                        }
                        this.nextMap[yIndex][x] = seacucumber.east;
                        seacucumbersMoved++;
                    }
            }
        }

        this.map = JSON.parse(JSON.stringify(this.nextMap));
        // Now the cucumbers moving down
        for (const [yIndex, line] of this.map.entries()) {
            for (const [xIndex, cucumber] of line.entries()) {
                if (cucumber !== seacucumber.south) continue;
                    if (this.canMove(xIndex, yIndex)) {
                        this.nextMap[yIndex][xIndex] = seacucumber.empty;
                        let y = yIndex + 1;
                        if (y >= this.map.length) {
                            y = 0;
                        }
                        this.nextMap[y][xIndex] = seacucumber.south;
                        seacucumbersMoved++;
                    }
            }
        }
        this.map = JSON.parse(JSON.stringify(this.nextMap));
        return seacucumbersMoved;
    }

    canMove(x: number, y: number): boolean {
        const val = this.map[y][x];
        switch (val) {
            case seacucumber.empty:
                return false;
            case seacucumber.east:
                let cucumberToTheRight = this.map[y]?.[x + 1];
                if (!cucumberToTheRight) {
                    cucumberToTheRight = this.map[y][0];
                }
                if (cucumberToTheRight === seacucumber.empty) return true;
                return false;
            case seacucumber.south:
                let cucumberBelow = this.map[y + 1]?.[x];
                if (!cucumberBelow) {
                    cucumberBelow = this.map[0][x];
                }
                if (cucumberBelow === seacucumber.empty) return true;
                return false;
        }
    }

    [util.inspect.custom]() {
        return this.map.map(line => line.join('')).join('\n');
    }
}

const seabed = new Seabed(input);

let cucumbersMoved = 1337;
let counter = 0;

while(cucumbersMoved > 0) {
    cucumbersMoved = seabed.runCycle();
    counter++;
}
console.log(counter);
