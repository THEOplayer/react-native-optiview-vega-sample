const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'react-native-theoplayer') {
        moduleName = '@theoplayer/react-native-vega';
      }
      if (
        platform === 'kepler' &&
        (moduleName === 'react-native' ||
          moduleName.startsWith('react-native/'))
      ) {
        moduleName = moduleName.replace(
          /^react-native/,
          '@amazon-devices/react-native-kepler',
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
