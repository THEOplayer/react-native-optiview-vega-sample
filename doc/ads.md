# Advertisements

## Overview

A good starting point to get acquainted with THEOplayer's advertising features
is THEOplayer's [Knowledge Base](https://optiview.dolby.com/docs/theoplayer/knowledge-base/advertisement/user-guide/).

While THEOplayer supports a wide range of different
[ad types](https://optiview.dolby.com/docs/theoplayer/knowledge-base/advertisement/user-guide/#an-overview-of-theoplayers-different-ad-types),
`@theoplayer/react-native-vega` currently only supports client-side ad insertion (CSAI) through [Google IMA](#getting-started-with-google-ima).

As recommended by Amazon, `@theoplayer/react-native-vega` uses the [Logix Google IMA Ads Manager](https://logituit.com/logixads-manager/), 
which hosts the Google IMA SDK in a WebView component. This sample uses the locally supplied
`@logituit-rel/logix-ads-manager@0.3.0+theoplayer.3` integration patch, not an upstream Logituit release.
See [Logix Ads Manager patch notes](../lib/LOGIX_AD_MANAGER_PATCH.md) for why the patch is required,
what it changes, and how to verify ad playback and remote-control behavior.

The following sections will guide you through the process of setting up Google IMA in your app.

## Getting started with Google IMA

### Configuration

Install the following dependencies:

```shell
npm install \
  @amazon-devices/webview@4.0.4-rn-83 \
  ./lib/logituit-rel-logix-ads-manager-0.3.0+theoplayer.3.tgz
```

The WebView package is required to host the Logix Ads Manager, which in turn hosts the Google IMA SDK.

In your app's `manifest.toml` file, also include the following service:

```toml
# Web renderer service for rendering web content
[[wants.service]]
id = "com.amazon.webview.renderer_service"
```

### Player configuration

The Logix IMA Ads Manager is configured as a feature flag. This way it can be disabled when not needed, which can save 
resources and improve performance.
Enable it through the player's configuration:

```tsx
const playerConfig: VegaPlayerConfiguration = {
  // ...
  features: [VegaFeatures.LOGIX_IMA_ADS],
};
```

### Source description

When providing the player with a source that includes a list of ads, make sure to
set the `integration` property to `"google-ima"`, as shown in one of the sources of the example app:

```typescript
const imaSource = {
  sources: [
    {
      src: 'https://cdn.theoplayer.com/video/dash/webvtt-embedded-in-isobmff/Manifest.mpd',
      type: 'application/dash+xml',
    },
  ],
  ads: [
    {
      integration: 'google-ima' as AdIntegrationKind,
      sources: {
        src: 'https://cdn.theoplayer.com/demos/ads/vast/dfp-preroll-no-skip.xml',
      },
    },
  ],
};
```

Optionally, the player's configuration can be set to remove the advertisement UI - in practice only the skip and countdown buttons -
and to set allowed mime types for ads, as shown in the example app's player configuration:

```tsx
const playerConfig = {
  ads: {
    // Hide the advertisement UI.
    uiEnabled: false,
    // Set allowed mime types for ads. By default, all mime types are allowed.
    allowedMimeTypes: ['video/mp4', 'video/3gpp', 'video/webm']
  },
};
```

### Using the Ads API

THEOplayer provides an [Ads API](https://optiview.dolby.com/docs/theoplayer/knowledge-base/advertisement/user-guide/#ads-api) that enables additional features such as:

- Querying whether an ad is currently playing;
- Skipping the current ad (if possible);
- Getting the ad break that is currently playing;

```tsx
const isPlayingAd = () => {
  return this.player.ads.playing();
};
```

### Subscribing to ad events

The player emits a variety of ad-related events. 

```tsx
player.addEventListener(PlayerEventType.AD_EVENT, (event: AdEvent) => {
  const ad = event.ad;
  switch (event.subType) {
    case AdEventType.ADD_AD_BREAK:
    case AdEventType.REMOVE_AD_BREAK:
    case AdEventType.AD_LOADED:
    case AdEventType.AD_BREAK_BEGIN:
    case AdEventType.AD_BEGIN:
    case AdEventType.AD_FIRST_QUARTILE:
    case AdEventType.AD_MIDPOINT:
    case AdEventType.AD_FIRST_QUARTILE:
    case AdEventType.AD_THIRD_QUARTILE:
    case AdEventType.AD_END:
    case AdEventType.AD_BREAK_END:
    case AdEventType.AD_SKIP:
    case AdEventType.AD_IMPRESSION:
    case AdEventType.AD_ERROR:
    case AdEventType.AD_CLICKED:
      console.log(`Received ad event: ${event.subType} for ad with id ${ad.id}`);
      break;
  }
});
```

See [AdEvent](https://theoplayer.github.io/react-native-theoplayer/api/interfaces/AdEvent.html),
[Ad](https://theoplayer.github.io/react-native-theoplayer/api/interfaces/Ad.html) and
[AdBreak](https://theoplayer.github.io/react-native-theoplayer/api/interfaces/AdBreak.html) for more information.

## Known issues and limitations

The following list of known issues will be addressed in the future:

- On a Vega virtual device, some ads may fail to play.
- In an adbreak with multiple ads, subsequent ads sometimes fail to play.
