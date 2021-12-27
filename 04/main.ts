import { example } from './input';
import colors from 'colors/safe';
import util from 'util';

class BingoNumber {
    public number: number;
    public isMarked: boolean;
    constructor(number: number | string, isMarked: boolean = false) {
        if (typeof number === 'string') {
            this.number = parseInt(number);
        } else {
            this.number = number;
        }
        this.isMarked = isMarked;
    }
}

class BingoBoard {
    public board: BingoNumber[][];
    public lastCalledNum: number;

    constructor(startNumbers: string) {
        this.board = [];
        this.lastCalledNum = 0;

        startNumbers.split('\n').forEach((line) => {
            const parsedLine = line
                .split(' ')
                .filter((num) => num !== '')
                .map((num) => new BingoNumber(num));
            this.board.push(parsedLine);
        });
    }

    markNumber(number: number): number {
        this.lastCalledNum = number;
        let numbersMarked = 0;
        this.board.forEach((row) => {
            row.forEach((num) => {
                if (num.number === number) {
                    num.isMarked = true;
                    numbersMarked++;
                }
            });
        });
        return numbersMarked;
    }

    checkForWin(): number {
        const horizontalWin = this.board
            .map((row) => row.every((num) => num.isMarked))
            .some((marked) => marked);

        const verticalWin = this.board[0]
            .map((_, i) => this.board.every((row) => row[i].isMarked))
            .some((marked) => marked);

        if (horizontalWin || verticalWin) {
            return this.calculateScore();
        }

        return -1;
    }

    calculateScore(): number {
        return this.sumOfUnmarkedNumbers() * this.lastCalledNum;
    }

    sumOfUnmarkedNumbers(): number {
        let sum = 0;
        for (const row of this.board) {
            for (const num of row) {
                if (!num.isMarked) {
                    sum += num.number;
                }
            }
        }
        return sum;
    }

    [util.inspect.custom]() {
        return this.toString();
    }

    toString() {
        return this.board
            .map((row) => {
                return row
                    .map((num) => {
                        if (num.isMarked) {
                            // return `\x1b[1m${num.number}\x1b[0m`;
                            return colors.inverse(String(num.number));
                        }
                        return num.number;
                    })
                    .join(' ');
            })
            .join('\n');
    }
}

class Bingo {
    public boards: BingoBoard[];
    public bingoNumbers: number[];
    constructor(input: string) {
        const [numbers, ...boardsNumbers] = input.split('\n\n');

        this.bingoNumbers = numbers.split(',').map((num) => parseInt(num));
        this.boards = boardsNumbers.map(
            (boardstring, i) => new BingoBoard(boardstring)
        );
    }

    markNextNumber(): number {
        if (this.bingoNumbers.length === 0) {
            return -1;
        }
        const nextNumber = this.bingoNumbers.shift() as number;

        let numbersMarked = 0;
        this.boards.forEach((board) => {
            numbersMarked += board.markNumber(nextNumber);
        });
        return numbersMarked;
    }

    checkForWins(): number[] {
        // Score of the board that won first
        return this.boards
            .map((board) => board.checkForWin())
            .filter((num) => num !== -1)
    }

    play() {
        let numbersMarked = 1337;
        while (numbersMarked > 0) {
            let numbersMarked = this.markNextNumber();
            if (numbersMarked === -1) {
                console.log('All numbers used up');
                break;
            }

            if (numbersMarked > 0) {
                const scores = this.checkForWins();
                if (scores.length > 0) {
                    console.log(scores);
                    break;
                }
            }
        }
    }

    [util.inspect.custom]() {
        return this.boards.map((board) => board.toString()).join('\n\n');
    }
}

const bingoGame = new Bingo(example);

bingoGame.play();
