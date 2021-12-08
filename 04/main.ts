import { example, input } from './input'

const [numbers, , ...boardsNumbers] = input.split('\n');

let inputNumbers = numbers.split(',').map(num => parseInt(num));

interface BingoNumber {
    number: number;
    isMarked: boolean;
}

class BingoNumber {
    constructor(number: number | string, public isMarked: boolean = false) {
        if (typeof number === 'string') {
            this.number = parseInt(number);
        } else {
            this.number = number;
        }
    }
}

const calculateScore = (boards: BingoNumber[][], lastNum: number) => {
    return lastNum * boards.flat().filter(num => num.isMarked === false).reduce((acc, num) => acc + num.number, 0);
}

let board: BingoNumber[][] = [];
let boards: BingoNumber[][][] = [];

boardsNumbers.forEach(line => {
    if (line === '') {
        boards.push(board);
        board = [];
        return;
    }
    const l = line.split(' ').filter(num => num !== '').map(num => new BingoNumber(num));
    board.push(l);
})
boards.push(board);

let count = 0;
let bingo = false;
while (inputNumbers.length > 0) {
    count++;
    // Mark the number
    const inputNumber = inputNumbers.shift();
    if (inputNumber === undefined) {
        break;
    }
    boards.forEach(board => {
        board.forEach(row => {
            const found = row.findIndex(num => num.number === inputNumber)
            if (found !== -1) {
                row[found].isMarked = true;
            }
        });
    })

    // Check if someone has 5 in a row

    // Horizontally
    boards.forEach(board => {
        board.forEach(row => {
            const hasBeenFound = row.filter(num => num.isMarked).length === 5;
            if (hasBeenFound) {
                console.log(`Count: ${count}, inputNumber: ${inputNumber}`);
                console.log(calculateScore(board, inputNumber));
                bingo = true;
            }
        });
    });

    // Vertically
    boards.forEach(board => {
        for (let idx = 0; idx < 5; idx++) {
            const hasBeenFound = board.filter(row => row[idx].isMarked).length === 5;
            if (hasBeenFound) {
                console.log(`Count: ${count}, inputNumber: ${inputNumber}`);
                console.log(calculateScore(board, inputNumber));
                bingo = true;
            }
        }
    });
    if (bingo) {
        break;
    }
}