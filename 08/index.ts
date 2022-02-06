import {input} from './input';

export const isLowPoint = (x: number, y: number, matrix: number[][]) => {
    const point = matrix[x][y];
    const surroundingValues: number[] = [];


    const offsets = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    offsets.forEach(offset => {
        const [xOffset, yOffset] = offset;
        surroundingValues.push(matrix[x + xOffset]?.[y + yOffset] ?? 42)
    })

    return Math.min(...surroundingValues) > point;
}

const riskLevel = (height: number) => height + 1;
const main = (matrix: number[][]) => {
    let risks = 0;
    matrix.forEach((line, x) => {
        line.forEach((num, y) => {
            if (isLowPoint(x, y, matrix)) {
                risks += riskLevel(num);
            }
        })
    })
    return risks;
}
const parse = () => input.split('\n').map(line => [...line].map(num => parseInt(num)));

const matrix = parse()
console.log(main(matrix));

