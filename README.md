# THEOplayer React Native Vega Sample

<img src="./doc/logo-optiview-dark.png#gh-dark-mode-only" height="120" alt="OptiView logo"><img src="./doc/logo-optiview-light.png#gh-light-mode-only" height="120" alt="OptiView logo"><img src="./doc/logo-react-native.png" height="120" alt="React Native logo"> <img src="./doc/logo-optiview-light.png#gh-light-mode-only" height="120" alt="OptiView logo"><img src="./doc/logo-firetv.png" height="120" alt="FireTV logo">

## License

This projects falls under the license as defined in https://github.com/THEOplayer/license-and-disclaimer.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Documentation and API Reference](#documentation-and-api-reference)

## Overview

This project demonstrates the use of THEOplayer in a sample Vega/Kepler app.

[Amazon Vega](https://developer.amazon.com/docs/vega/0.24/vega-release-notes) is a
React Native SDK that helps third-party developers create, build, test, package, and publish
apps for Fire TV devices running the Vega OS. With Vega, your app can run on multiple Amazon devices.

## Features

| Feature                        | Supported | Notes                                                                                                                     |
|--------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------|
| HLS (CMAF) streams             | &check;   |                                                                                                                           |
| HLS (TS) streams               | &check;   | Using a Turbo module hosting THEO's own transmuxing functionality.                                                        |
| DASH streams                   | &check;   |                                                                                                                           |
| Adaptive Bitrate Streaming     | &check;   |                                                                                                                           |
| Content Protection (DRM)       | &check;   |                                                                                                                           |
| Subtitles & Closed Captions    | &check;   | `THEOplayerCaptionsView` is used instead of Amazon's `KeplerCaptionsView`, to allow more flexibility and caption styling. |
| Autoplay                       | &check;   |                                                                                                                           |
| `@theoplayer/react-native-drm` | &check;   | DRM connector support is available as of v0.1.0-pre12.                                                                    |
| Progressive MP4, MP3           | &check;   |                                                                                                                           |
| Advertisement                  | &check;   | Client-side ad insertion (CSAI) through [Logix Google IMA Ads Manager](./doc/ads.md).                                     |
| `@theoplayer/react-native-ui`  | &check;   |                                                                                                                           |

### Getting Started

A good place to start is the example application provided in this repository. 
It demonstrates how to set up and use `@theoplayer/react-native-vega` 1.0.0 with React Native 0.83, React 19.2, and Vega runtime 4.

- [Building the example application](./doc/example-app.md)
- [Changelog](./CHANGELOG.md)
- [Logix Ads Manager integration patch](./lib/LOGIX_AD_MANAGER_PATCH.md)
- Knowledge Base
  - [Advertisements](./doc/ads.md)
  - [Useful CLI commands](./doc/cli_commands.md)

### Documentation and API Reference

The API of `@theoplayer/react-native-vega` aims to be compatible with the API of `react-native-theoplayer`,
the React Native SDK for all Web and mobile devices, which is documented here:

- [THEOplayer React Native SDK Documentation](https://optiview.dolby.com/docs/theoplayer/react-native/)
