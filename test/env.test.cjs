const assert = require('node:assert/strict');
const {execFileSync, spawnSync} = require('node:child_process');
const {mkdtempSync, readFileSync, rmSync, writeFileSync} = require('node:fs');
const {tmpdir} = require('node:os');
const path = require('node:path');
const {test} = require('node:test');

const root = path.resolve(__dirname, '..');
const transform = `
  const assert = require('node:assert/strict');
  const {transformSync} = require('@babel/core');
  const {readFileSync} = require('node:fs');
  const ts = require('typescript');
  const vm = require('node:vm');
  const config = require('./babel.config');
  const source = readFileSync('src/screens/PlayerScreen.tsx', 'utf8');
  const ast = ts.createSourceFile('PlayerScreen.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = ast.statements.filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .find(entry => entry.name.getText(ast) === 'playerConfig');
  const license = declaration.initializer.properties.find(entry => entry.name?.getText(ast) === 'license');
  const expression = license.initializer.getText(ast);
  assert.ok(expression.replace(/\\s+/g, '') === 'DOLBY_LICENSE_KEY?.trim()||undefined', 'Player configuration must use the env license without an inline fallback');
  assert.ok(source.includes('// Add your THEOplayer React Native license key here'));
  assert.ok(config.plugins?.some(entry => entry[0] === 'module:react-native-dotenv'));
  const plugins = config.plugins.map(entry => entry[0] === 'module:react-native-dotenv'
    ? [entry[0], {...entry[1], path: process.argv[1]}]
    : entry);
  const {code} = transformSync(
    'import {DOLBY_LICENSE_KEY} from "@env"; module.exports = ' + expression + ';',
    {...config, plugins, configFile: false, babelrc: false, filename: 'env-fixture.ts'},
  );
  const module = {exports: undefined};
  vm.runInNewContext(code, {module});
  process.stdout.write(JSON.stringify(module.exports ?? null));
`;

for (const [name, contents, expected] of [
  ['missing .env leaves license unset', undefined, null],
  ['empty license leaves license unset', 'DOLBY_LICENSE_KEY=\n', null],
  [
    'whitespace-only license leaves license unset',
    'DOLBY_LICENSE_KEY="   "\n',
    null,
  ],
  [
    'local license is inlined and trimmed',
    'DOLBY_LICENSE_KEY=" test-license "\n',
    'test-license',
  ],
]) {
  test(name, (t) => {
    const directory = mkdtempSync(path.join(tmpdir(), 'vega-env-test-'));
    t.after(() => rmSync(directory, {recursive: true, force: true}));
    const envPath = path.join(directory, '.env');
    if (contents !== undefined) writeFileSync(envPath, contents);
    const env = {...process.env, NODE_ENV: 'test'};
    delete env.DOLBY_LICENSE_KEY;
    delete env.APP_ENV;
    delete env.BABEL_ENV;
    const result = execFileSync(process.execPath, ['-e', transform, envPath], {
      cwd: root,
      env,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    assert.equal(JSON.parse(result), expected);
  });
}

test('release builds reset Metro cache so env changes are bundled', () => {
  const {scripts} = require('../package.json');
  assert.ok(scripts['build:release'].split(/\s+/).includes('--reset-cache'));
  assert.ok(scripts['app:release'].split(/\s+/).includes('build:release'));
});

test('env imports are limited to the license key', () => {
  const plugin = require('../babel.config').plugins?.find(
    (entry) => entry[0] === 'module:react-native-dotenv',
  );
  assert.deepEqual(plugin?.[1].allowlist, ['DOLBY_LICENSE_KEY']);
});

test('local env files are ignored but the example can be committed', () => {
  const result = spawnSync(
    'git',
    [
      'check-ignore',
      '--no-index',
      '--',
      '.env',
      '.env.local',
      '.env.production',
      '.env.production.local',
      '.env.example',
    ],
    {
      cwd: root,
      encoding: 'utf8',
    },
  );
  assert.equal(result.status, 0);
  assert.deepEqual(result.stdout.trim().split('\n'), [
    '.env',
    '.env.local',
    '.env.production',
    '.env.production.local',
  ]);
});

test('env example contains only an empty license placeholder', () => {
  assert.ok(
    readFileSync(path.join(root, '.env.example'), 'utf8') ===
      'DOLBY_LICENSE_KEY=\n',
    'The example must contain only an empty license placeholder',
  );
});
