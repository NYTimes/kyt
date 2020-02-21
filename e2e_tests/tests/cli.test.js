const shell = require('shelljs');
const path = require('path');

let rootPath;
shell.config.silent = false;
describe('KYT CLI', () => {
  beforeAll(() => {
    shell.mkdir('stage-cli');
    shell.cd('stage-cli');
    rootPath = path.resolve(process.cwd());
  });

  window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

  describe.each([
    ['universal', 'standard-starter', '', ''],
    ['static', 'static-starter', '', ''],
    [
      'Git repo',
      'git-starter',
      '\\027[B\\027[B',
      'https://github.com/NYTimes/kyt-starter-test.git',
    ],
  ])('setup for %s starter-kyt', (slug, directory, starter, repo) => {
    it(`sets up a ${slug} starter-kyt`, () => {
      const exec = new Promise(resolve => {
        shell.cd(rootPath);
        const child = shell.exec('../packages/kyt-core/lib/index.js setup', (code, stdout) => {
          resolve({ code, output: stdout });
        });
        let skdone = false;
        let chooseDone = false;
        let ypmDone = false;
        let repoDone = false;
        child.stdout.on('data', data => {
          if (data.includes('Choose an installer')) {
            if (!ypmDone) {
              child.stdin.write('\n');
              ypmDone = true;
            }
          }
          if (data.includes('Enter a new directory name.')) {
            if (!skdone) {
              child.stdin.write(`${directory}\n`);
              skdone = true;
            }
          }
          if (data.includes('Choose a starter-kyt')) {
            if (!chooseDone) {
              child.stdin.write(`${starter}\n`);
              chooseDone = true;
            }
          }
          if (repo && data.includes('Enter your Repo URL (https or ssh)')) {
            if (!repoDone) {
              child.stdin.write(`${repo}\n`);
              repoDone = true;
            }
          }
        });
      });
      return exec.then(test => {
        shell.cd(directory);
        expect(test.code).toBe(0);
        const setupArr = test.output.split('\n');

        expect(setupArr.includes('👍  Added kyt scripts into your package.json scripts')).toBe(
          true
        );
        expect(setupArr.includes('👍  Added new dependencies to package.json')).toBe(true);
        expect(setupArr.includes('👍  Installed new modules')).toBe(true);
        expect(setupArr.includes('👍  Created .eslintrc.js file')).toBe(true);
        expect(setupArr.includes('👍  Created kyt.config.js file')).toBe(true);
        expect(setupArr.includes('👍  Created .editorconfig file')).toBe(true);
        expect(setupArr.includes('👍  Created .gitignore file')).toBe(true);
        expect(setupArr.includes('👍  Created src directory')).toBe(true);
      });
    });

    it('sets up with the correct files', () => {
      expect(shell.test('-d', 'src')).toBe(true);
      expect(shell.test('-f', 'kyt.config.js')).toBe(true);
      expect(shell.test('-f', '.editorconfig')).toBe(true);
      expect(shell.test('-f', '.eslintrc.js')).toBe(true);
    });

    it('sets up the package json scripts', () => {
      const userPackageJSON = require.requireActual(path.join(process.cwd(), 'package.json'));
      // eslint-disable-next-line import/no-unresolved
      const { scripts } = userPackageJSON;
      expect(scripts.dev).toBe('kyt dev');
      expect(scripts.start).toBe('node build/server/main.js');
      expect(scripts.build).toBe('kyt build');
      expect(scripts.test).toBe('jest');
      expect(scripts.lint).toBe('eslint .');
      expect(scripts['kyt:help']).toBe('kyt --help');
    });

    it('verifies the source directory', () => {
      if (slug !== 'server') {
        expect(shell.test('-d', 'src/client')).toBe(true);
        expect(shell.test('-f', 'src/client/index.js')).toBe(true);
      }
      if (slug === 'universal') {
        expect(shell.test('-d', 'src/server')).toBe(true);
        expect(shell.test('-f', 'src/server/index.js')).toBe(true);
      }
    });
  });

  afterAll(() => {
    shell.cd('../..');
    shell.rm('-rf', 'stage-cli');
  });
});
