import { example, input } from './input';
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
    private hasWon: boolean;

    constructor(startNumbers: string) {
        this.board = [];
        this.lastCalledNum = 0;
        this.hasWon = false;

        startNumbers.split('\n').forEach((line) => {
            const parsedLine = line
                .split(' ')
                .filter((num) => num !== '')
                .map((num) => new BingoNumber(num));
            this.board.push(parsedLine);
        });
    }

    markNumber(number: number): number {
        if (this.hasWon) {
            return 0;
        }

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
        if (this.hasWon) {
            return this.calculateScore();
        }

        const horizontalWin = this.board
            .map((row) => row.every((num) => num.isMarked))
            .some((marked) => marked);

        const verticalWin = this.board[0]
            .map((_, i) => this.board.every((row) => row[i].isMarked))
            .some((marked) => marked);

        if (horizontalWin || verticalWin) {
            this.hasWon = true;
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
    public previousScores: number[] = [];

    constructor(input: string) {
        const [numbers, ...boardsNumbers] = input.split('\n\n');

        this.bingoNumbers = numbers.split(',').map((num) => parseInt(num));
        this.boards = boardsNumbers.map(
            (boardstring, i) => new BingoBoard(boardstring)
        );
    }

    markNextNumber(): number {
        const nextNumber = this.bingoNumbers.shift() as number;

        let numbersMarked = 0;
        this.boards.forEach((board) => {
            numbersMarked += board.markNumber(nextNumber);
        });
        return numbersMarked;
    }

    checkForWins(): number[] {
        // Scores of the different boards after they won
        return this.boards
            .map((board) => board.checkForWin())
            .filter((num) => num !== -1);
    }

    play() {
        while (this.bingoNumbers.length > 0) {
            let numbersMarked = this.markNextNumber();

            if (numbersMarked > 0) {
                const scores = this.checkForWins();

                // All boards have won
                if (scores.length === this.boards.length) {
                    // Find the new score
                    const newScore = scores.filter((score) =>
                        !this.previousScores.includes(score)
                    );
                    return newScore[0];
                }
                this.previousScores = scores;
            }
        }
        console.log("No more numbers left");
    }

    [util.inspect.custom]() {
        return this.boards.map((board) => board.toString()).join('\n\n');
    }
}

const bingoGame = new Bingo(input);

const result = bingoGame.play();
console.log(result);
