import {isLowPoint} from './index';

describe("isLowPoint", () => {
    it('should work for the happy route', () => {
        const matrix = [[9,9,9],
                        [9,1,9],
                        [9,9,9]];
        expect(isLowPoint(1, 1, matrix)).toBe(true);
    })

    it("should work for happy route but not low point", () => {
        const matrix = [[9,1,9],
                        [9,3,9],
                        [9,3,9]];
        expect(isLowPoint(1, 1, matrix)).toBe(false);
    })

    it("should work it its at a border and not a low point", () => {
        const matrix = [[9,3,8],
                        [2,3,4]];

        expect(isLowPoint(0, 1, matrix)).toBe(false);
    })

    it("should work it its at a border and a low point", () => {
        const matrix = [[9,3,8],
                        [2,4,4]];

        expect(isLowPoint(0, 1, matrix)).toBe(true);
    })

    it("should work it its in a corner and a low point", () => {
        const matrix = [[1,3],
                        [2,4]];

        expect(isLowPoint(0, 0, matrix)).toBe(true);
    })

    it("should work it its in a corner and not a low point", () => {
        const matrix = [[3,3],
                        [2,4]];

        expect(isLowPoint(0, 0, matrix)).toBe(false);
    })
})
