import path from 'path';
import { testPathForSource } from './utils';

describe('testPathForSource', () => {
    it('detrmines the correct path for a typescript test', () => {
        const input = '/any/rand/path/utils.ts';
        const expected = '/any/rand/path/utils.spec.ts';

        const result = testPathForSource(input);

        expect(result).toEqual(expected);
    });

    it('determines the correct path for a PHP test', () => {
        const input = path.join(process.cwd(), '__tests__/php/app/Example.php');
        const expected = path.join(
            process.cwd(),
            '__tests__/php/tests/unit/ExampleTest.php'
        );

        const result = testPathForSource(input);

        expect(result).toEqual(expected);
    });
});
