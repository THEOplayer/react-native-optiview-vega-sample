# Agent Guidelines

## Verification

- Install the locked dependencies with `npm ci`.
- Run `npm test`, `npm run typescript`, and `npm run lint`.
- Check formatting with `npx --no-install prettier --check src test package.json babel.config.js metro.config.js eslint.config.mjs tsconfig.json`.
- Build release packages with `npm run build:release`; Vega SDK 0.24 produces artifacts under `build/{aarch64,armv7,x86_64}-release/`.
- `vega project doctor` checks manifest and SDK compatibility. Builds do not replace on-device playback, ad, and remote-control smoke tests.

## Integration Constraints

- Keep `react-native-theoplayer` installed for the shared API used by the packaged Vega adapter. Metro must map only its bare package import to `@dolby-optiview/react-native-vega`, preserving shared API subpaths.
- A custom Metro resolver must also preserve Vega's mapping of `react-native` and its subpaths to `@amazon-devices/react-native-kepler` on the `kepler` platform. Babel aliases alone do not cover all dependency imports.
- Verify release source maps do not include the mobile THEOplayer implementation, and that the packaged Logix HTML exists at the path documented in `lib/LOGIX_AD_MANAGER_PATCH.md`.
- RN 0.83 layout values are density-independent units. Do not divide window dimensions, percentages, or flex values by pixel density.
- Extend `@react-native/typescript-config` through its package export, not the unexported `/tsconfig.json` subpath.
- Keep the local Logix archive and its documentation together; do not patch installed dependencies manually.
