module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowlist: ['THEO_LICENSE_KEY'],
        allowUndefined: true,
      },
    ],
  ],
};
