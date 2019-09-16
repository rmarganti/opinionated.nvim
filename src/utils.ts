import fs from 'fs';
import path from 'path';

const PHP_EXTENSIONS = ['.php'];
const JS_TS_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * Determines the path of the test file for the given source file.
 * JS/TS tests are co-located with their source files. PHP tests
 * are located in a Tests folder
 */
export function testPathForSource(sourcePath: string) {
    const ext = path.extname(sourcePath);

    if (JS_TS_EXTENSIONS.includes(ext)) {
        return jsTsPath(sourcePath);
    }

    if (PHP_EXTENSIONS.includes(ext)) {
        return phpPath(sourcePath);
    }

    return undefined;
}

/**
 * Given a file path, ensure its parent directory
 * and all necessary ancestory directories exist.
 */
export function ensureDirExistsForFile(sourcePath: string) {
    const dir = path.dirname(sourcePath);

    if (fs.existsSync(dir)) {
        return;
    }

    fs.mkdirSync(dir, { recursive: true });
}

/**
 * Determine the path of a test file for a JS or TS source file.
 */
function jsTsPath(sourcePath: string) {
    const pathInfo = path.parse(sourcePath);
    const { dir, ext, name } = pathInfo;

    return path.join(dir, `${name}.spec${ext}`);
}

/**
 * Determine the path of a test file for a PHP source file.
 */
function phpPath(sourcePath: string) {
    const pathInfo = path.parse(sourcePath);
    const { dir, name } = pathInfo;

    const projectRoot = phpRootForFile(sourcePath);

    if (!projectRoot) {
        return undefined;
    }

    const appRoot = path.join(projectRoot, 'app');
    const relativeDir = dir.replace(appRoot, '');
    const testFileName = `${name}Test.php`;

    const integrationPath = path.join(
        projectRoot,
        'tests/integration',
        relativeDir,
        testFileName
    );

    const unitPath = path.join(
        projectRoot,
        'tests/unit',
        relativeDir,
        testFileName
    );

    if (fs.existsSync(integrationPath)) {
        return integrationPath;
    }

    return unitPath;
}

/**
 * Determine the root of a PHP project by searching for a composer.json
 */
function phpRootForFile(sourcePath: string): string | undefined {
    const pathPieces = sourcePath.split(path.sep);
    pathPieces.pop();

    if (pathPieces.length === 0) {
        return undefined;
    }

    const dir = pathPieces.join(path.sep);

    if (dirHasComposerJson(dir)) {
        return dir;
    }

    return phpRootForFile(pathPieces.join(path.sep));
}

/**
 * Does the directory contain a composer.json file?
 */
function dirHasComposerJson(dir: string) {
    return fs.existsSync(path.join(dir, 'composer.json'));
}
