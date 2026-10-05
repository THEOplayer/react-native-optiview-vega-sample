# Vega changelog

## Unreleased

### Fixes

- Blocked content seeking through the React Native API and default remote Skip, Fast Forward, Rewind, Seek, and Start Over commands throughout IMA ad breaks, including paused ads and gaps between ads. Blocked commands are discarded; ad Play/Pause and normal post-ad seeking remain available.

## 1.0.0

Changes to the Vega SDK, React Native adapter, and demo since `vega-beta.21` (2026-04-29).

### Features

- Added support for numeric, timestamp, percentage, and `start`/`end` ad offsets in source descriptions.
- Added notifications for non-fatal IMA errors and failed ad breaks.
- Added a Vega SDK build container.

### Changes

- Renamed the core SDK to `@dolby-optiview/vega` and the React Native adapter to `@dolby-optiview/react-native-vega`. Update package dependencies and imports to the new names; public API symbols remain unchanged.
- Renamed the core bundles to `OptiView.vega.js` and `OptiView.vega.d.ts` and updated package descriptions to Dolby OptiView Vega. The `@theoplayer/theomux-vega` dependency remains unchanged.
- Upgraded to React Native 0.83, React 19.2, and the Vega React Native 4 runtime.
- Updated the demo manifest to target Vega OS 1.2 and allow cleartext traffic only to localhost.
- Migrated to Logix Ads Manager 0.3.0 with the [OptiView integration patch](lib/LOGIX_AD_MANAGER_PATCH.md).
- Updated the demo UI package to 0.23.5 and DRM integration to 1.13.0.
- Declared the Vega core SDK as a peer dependency of the React Native adapter.
- Updated the Node.js requirement to 22.14 or newer and adopted Windows-compatible cleanup scripts.
- Adjusted demo text and control-bar dimensions for density-independent layout.
- Replaced skippable demo ad creatives with non-skippable test tags.
- Added regression tests and standardized package test commands, keeping CI typechecking separate.
- Updated development documentation and documented Logix patch installation and reproduction.

### Fixes

- Fixed content briefly resuming between a scheduled midroll's readiness pause and ad playback, while preserving post-ad resume and startup-error recovery.
- Fixed UI Play actions throwing an uncaught exception after a license or playback error in the React Native adapter, while preserving the existing player error event.
- Fixed autoplay being blocked by outdated capability reporting.
- Fixed default remote Play/Pause commands bypassing OptiView and active ads, while preserving custom handlers across player resets.
- Fixed internal content playback events interrupting ad playback.
- Fixed hidden ad WebViews consuming remote-control keys after content resumed.
- Fixed ad-page loading failures caused by Metro HTTP URLs and cleartext IMA bridge requests.
- Fixed IMA startup ordering and duplicate ad requests during readiness notifications and rerenders.
- Fixed stale ad callbacks executing after source changes, manager replacement, or teardown.
- Fixed VMAP cue-point and postroll handling, including finished content restarting after postrolls.
- Fixed oversized captions and CEA-608 shadows after the React Native 0.83 migration.
- Fixed CEA-608 font-size overrides supplied through style arrays without changing accessibility scaling or caption positioning.
- Fixed caption-format updates by tracking the selected format in React state.
- Fixed BackHandler cleanup to use the subscription API supported by newer React Native versions.

These changes did not address the end-of-stream buffering indicator or intermittent ad stalls.
