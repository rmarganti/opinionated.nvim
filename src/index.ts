import { Command, Plugin, Neovim } from 'neovim';
import { ensureDirExistsForFile, testPathForSource } from './utils';

@Plugin({ dev: true })
class Testy {
    constructor(private nvim: Neovim) {}

    @Command('TheHighwayEditTest')
    async editTest() {
        const bufferName = await this.nvim.buffer.name;
        const testPath = testPathForSource(bufferName);

        if (!testPath) {
            this.nvim.command(
                'echomsg "Unable to determine correct path for test file."'
            );

            return;
        }

        ensureDirExistsForFile(testPath);

        this.nvim.command(`vsplit ${testPath}`);
    }
}

export default Testy;
