# Logix Ads Manager patch for THEOplayer on Vega

This document describes the integration-specific patch to `@logituit-rel/logix-ads-manager` used with THEOplayer's React Native integration on Vega. It addresses ad-page loading and remote-control focus handling. It is not an upstream Logituit release.

| Item             | Value                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Upstream package | `@logituit-rel/logix-ads-manager@0.3.0`                                                                            |
| Patched version  | `0.3.0+theoplayer.3`                                                                                               |
| Distribution     | [`logituit-rel-logix-ads-manager-0.3.0+theoplayer.3.tgz`](./logituit-rel-logix-ads-manager-0.3.0+theoplayer.3.tgz) |
| Source patch     | [`logix-ads-manager-0.3.0-bundled-html.patch`](./logix-ads-manager-0.3.0-bundled-html.patch)                       |

The patch targets the React Native 0.83 Vega integration and retains upstream Logix 0.3.0's dependency requirements. It is not an upgrade path for React Native 0.72 or Logix 0.2.x. Align dependencies with your supported THEOplayer/Vega SDK release before installation, and validate your application's device and SDK combination before deployment.

## What the patch changes

The patch changes `dist/AdsContainer.js` and the package version in `package.json`.

### 1. Load the packaged ad page in both Debug and Release

Upstream Logix resolves `ads-manager.html` through React Native's `Image.resolveAssetSource()`. During development, that can produce an HTTP URL served by Metro.

This causes two possible startup failures with WebView's cleartext restrictions:

- The HTTP Metro page itself can be blocked.
- Even if localhost HTTP is allowed, IMA can select an HTTP bridge URL because its containing page was loaded over HTTP. That remote HTTP request can then be blocked.

The patch always uses Logix's existing packaged-file URI:

```text
file:///pkg/bundle/assets/node_modules/@logituit-rel/logix-ads-manager/dist/ads-manager.html
```

The HTML `require('./ads-manager.html')` remains in the package so the build includes the asset. With the tested IMA loader, a `file:` page selects an HTTPS IMA bridge rather than an HTTP bridge.

This does not disable cleartext protection or require a blanket HTTP allowlist. The patch does not modify Google's IMA SDK.

**Packaging requirement:** the application must include the HTML at the path above. If custom asset packaging changes that location, align the packaging before using this patch.

**Development consequence:** changes to the packaged HTML require rebuilding and reinstalling the app. The HTML is no longer live-loaded from Metro; ordinary React Native JavaScript development remains separate.

### 2. Keep native media-control ownership with THEOplayer

The patch explicitly sets the ad WebView's property:

```tsx
allowsDefaultMediaControl={false}
```

This disables WebView's automatic Vega media-control bridge, avoiding competition with the media-control handler registered by the THEOplayer integration.

**Integration requirement:** the host application must provide the THEOplayer media-control integration. This package should not be used as a standalone WebView player expecting WebView's default transport handling. Applications supplying a custom media-control handler remain responsible for routing commands correctly between content and active ads.

### 3. Release input focus when an ad break ends

Disabling the media-control bridge alone does not stop physical remote keys from reaching a focused WebView.

Upstream Logix requests focus when an ad starts, but its container retains preferred-focus configuration when the ad finishes. A hidden ad WebView can therefore continue receiving Play/Pause keys instead of letting them reach the content player.

The patch:

- Calls `FocusManager.blur(viewRef.current)` on `CONTENT_RESUME_REQUESTED` when the view exists.
- Makes the ad container's `hasTVPreferredFocus` conditional on `displayWebview`.
- Makes the WebView itself focusable only while `displayWebview` is true.
- Gates the WebView's own preferred-focus request with `displayWebview && wvFocus`.

This releases the ad view's focus and prevents hidden ad views from continuing to request or accept focus between breaks. It does not attempt to restore a specific previously focused application button.

## Install in an application

1. Obtain the supplied patched `.tgz` archive and place it in your application's `lib/` directory.
2. From the application root, install that file:

    ```sh
    npm install --save-exact "./lib/logituit-rel-logix-ads-manager-0.3.0+theoplayer.3.tgz"
    ```

3. Preserve the resulting dependency declaration and lockfile, and make the archive available to fresh checkouts and CI builds. This is a local-file dependency, not a version to request from the public npm registry.
4. Verify the resolved package version:

    ```sh
    node -p "require('@logituit-rel/logix-ads-manager/package.json').version"
    ```

    Expected output: `0.3.0+theoplayer.3`.

5. Rebuild, reinstall, and fully restart the Vega application using your project's normal deployment commands. Do not rely solely on Fast Refresh when adopting the patched dependency.

The THEOplayer adapter's peer dependency does not automatically install this local patch for external applications. The consuming application must select the supplied archive. In linked or multi-package projects, ensure the runtime does not resolve a second, unpatched Logix installation.

For this sample, the archive is in `lib/`, so the dependency path from the application root is `file:lib/logituit-rel-logix-ads-manager-0.3.0+theoplayer.3.tgz`.

## Verify the integration

- Confirm Logix's `onLoadStart` URL uses the packaged `file:///pkg/bundle/assets/.../ads-manager.html` location, not an HTTP Metro URL.
- Test a supported, non-skippable preroll and confirm content resumes after it.
- Check remote Play/Pause during the ad, then Play/Pause and content skip-forward/backward after the ad finishes, without first moving focus with the D-pad.
- For VMAP, repeat the check after a midroll to verify focus can be acquired and released across multiple breaks.
- Verify your application's custom media-control and UI focus behavior, if applicable.

## Scope and limitations

This patch does not:

- Change VAST/VMAP scheduling, cue points, or `timeOffset` handling.
- Add skippable-ad support where the IMA integration does not support it.
- Fix empty ad responses, ad-server fill decisions, HTTP errors, or CORS configuration.
- Change video decoding or fix every ad-media buffering or decoder problem.
- Modify Vega WebView's compatibility metadata, application permissions, or network-security policy.
- Include the THEOplayer adapter's separate startup, teardown, or diagnostic changes.

A valid ad response and compatible media are still required. Successful HTML loading and correct remote-key routing do not by themselves establish that every creative will play.

## Reproduce the package from the SDK repository

Application developers can use the supplied archive directly. Maintainers with access to `theoplayer-next` can regenerate it using `vega/build-tools/repack-logix-ads-manager.mjs` in that repository.

From the SDK repository's `vega/` directory:

```sh
node build-tools/repack-logix-ads-manager.mjs
```

The script downloads upstream version `0.3.0`, verifies its pinned SHA-512 integrity, checks and applies the source patch, and creates the patched archive under `lib/`. Package lifecycle scripts are disabled during repacking. Node.js, npm, Git, and tar are required.

Do not rely on manual edits inside `node_modules`; reinstalling dependencies would discard them. When changing the patch, create a new patched version and update the application dependency and lockfile rather than silently replacing an existing version's archive.

## Patch revisions

| Revision             | Cumulative changes                                                             |
| -------------------- | ------------------------------------------------------------------------------ |
| `0.3.0+theoplayer.1` | Use packaged HTML instead of Metro-resolved HTML.                              |
| `0.3.0+theoplayer.2` | Also disable WebView's automatic media-control bridge.                         |
| `0.3.0+theoplayer.3` | Also release ad focus and disable hidden ad-view focusability/preferred focus. |

Use revision 3 rather than the earlier revisions for the complete set of changes described here.
