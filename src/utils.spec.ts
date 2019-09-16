import path from 'path';
import { testPathForSource } from './utils';

describe('testPathForSource', () => {
    it('detrmines the correct path for a typescript test', () => {
        const input = '/any/rand/path/utils.ts';
        const expected = '/any/rand/path/utils.spec.ts';

        const result = testPathForSource(input);

        expect(result).toEqual(expected);
    });

    it('determines the correct path for a not already existing PHP test', () => {
        const input = path.join(
            process.cwd(),
            '__tests__/php/app/Domain/DoesntHaveTest.php'
        );

        const expected = path.join(
            process.cwd(),
            '__tests__/php/tests/unit/Domain/DoesntHaveTestTest.php'
        );

        const result = testPathForSource(input);

        expect(result).toEqual(expected);
    });

    it('determines the correct path for an already existing PHP test', () => {
        const input = path.join(
            process.cwd(),
            '__tests__/php/app/Domain/HasTest.php'
        );

        const expected = path.join(
            process.cwd(),
            '__tests__/php/tests/integration/Domain/HasTestTest.php'
        );

        const result = testPathForSource(input);

        expect(result).toEqual(expected);
    });
});
