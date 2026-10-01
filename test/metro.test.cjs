const assert = require('node:assert/strict');
const {test} = require('node:test');
const {resolver} = require('../metro.config');

for (const [name, moduleName, platform, expected] of [
  [
    'uses the Vega adapter for player and UI imports',
    'react-native-theoplayer',
    'kepler',
    '@dolby-optiview/react-native-vega',
  ],
  [
    'preserves the shared THEOplayer API subpath',
    'react-native-theoplayer/src/api/barrel',
    'kepler',
    'react-native-theoplayer/src/api/barrel',
  ],
  [
    'uses the Vega React Native runtime',
    'react-native',
    'kepler',
    '@amazon-devices/react-native-kepler',
  ],
  [
    'resolves navigation internals from the Vega runtime',
    'react-native/Libraries/Utilities/registerGeneratedViewConfig',
    'kepler',
    '@amazon-devices/react-native-kepler/Libraries/Utilities/registerGeneratedViewConfig',
  ],
  [
    'preserves React Native resolution on other platforms',
    'react-native',
    'android',
    'react-native',
  ],
  [
    'preserves already-mapped Vega runtime imports',
    '@amazon-devices/react-native-kepler',
    'kepler',
    '@amazon-devices/react-native-kepler',
  ],
  [
    'preserves unrelated dependencies',
    '@logituit-rel/logix-ads-manager',
    'kepler',
    '@logituit-rel/logix-ads-manager',
  ],
]) {
  test(name, () => {
    const result = {type: 'sourceFile', filePath: '/resolved/module.js'};
    const context = {
      resolveRequest(actualContext, actualModule, actualPlatform) {
        assert.equal(actualContext, context);
        assert.equal(actualModule, expected);
        assert.equal(actualPlatform, platform);
        return result;
      },
    };
    assert.equal(
      resolver.resolveRequest(context, moduleName, platform),
      result,
    );
  });
}
