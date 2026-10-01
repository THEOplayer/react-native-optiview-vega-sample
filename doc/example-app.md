## Example Application

The example application builds upon the `@theoplayer/react-native-vega` package to create a functional
Vega app.

The `@theoplayer/react-native-vega` package is a private npm package, located in the `lib/` folder,
which provides a `THEOplayerView` component that aligns with our `react-native-theoplayer` SDK.

![](./sample-01.png)

### Prerequisites

- Vega SDK **v0.24** with a device running **Vega OS 1.2** or newer and supporting Vega React Native runtime 4.
- Node.js **22.14.0** or newer.
- This sample uses **React Native 0.83.0**, **React 19.2.0**, and **THEOplayer Vega 1.0.0**.
- In order to use one of these THEOplayer SDKs, it is necessary to obtain a **valid React Native THEOplayer license**. You can sign up for a THEOplayer SDK license through [our portal](https://portal.theoplayer.com/).
- The local npm THEOplayer packages, which are not publicly available yet but provided in the `lib` folder:
    - `@theoplayer/vega`: THEOplayer native SDK for Vega.
    - `@theoplayer/react-native-vega`: React Native API for Vega.
    - `@theoplayer/theomux-vega`: Turbo module hosting THEO's own transmuxing functionality for TS-based HLS streams.
- Ads use the supplied `@logituit-rel/logix-ads-manager` **0.3.0+theoplayer.3** archive. See the [patch notes](../lib/LOGIX_AD_MANAGER_PATCH.md) for installation, behavior, and limitations.
- Optionally, Visual Studio Code with Vega plugins is installed.

### Build

Install dependencies:

`npm ci`

The standalone Vega adapter uses shared API definitions from `react-native-theoplayer@10.13.0`. Keep that dependency installed. The sample's Metro resolver routes bare `react-native-theoplayer` imports to `@theoplayer/react-native-vega`, while preserving the shared API subpaths and Vega's React Native runtime mapping. This also ensures the UI and DRM connectors use the Vega implementation.

Run `npm test`, `npm run typescript`, and `npm run lint` to check the sample before building.

Set your THEOplayer React Native license in `src/screens/PlayerScreen.tsx` before testing sources outside the release SDK's built-in demo domains.

Then build & run preferable using Visual Studio Code's Vega extensions, or alternatively:

`npm run app:release`

![](./sample-02.png)

### Player creation

The player is created using the `THEOplayerView` component. A basic example is shown below:

```tsx
import React, {useState} from 'react';
import {View} from 'react-native';
import {THEOplayer, PlayerConfiguration, THEOplayerView} from '@theoplayer/react-native-vega';

const playerConfig: PlayerConfiguration = {
  // insert THEOplayer React Native license here
  license: undefined,
};

export const App = () => {
  const [player, setPlayer] = useState<THEOplayer | undefined>(undefined);

  const onPlayerReady = (player: THEOplayer) => {
    setPlayer(player);
    player.autoplay = true;
    player.source = {
      "sources": [
        {
          "src": "https://cdn.theoplayer.com/video/sintel/nosubs.m3u8",
          "type": "application/x-mpegurl"
        }
      ]
    };
  };

  return (
    <View style={{flex: 1}}>
      <THEOplayerView config={playerConfig} onPlayerReady={onPlayerReady} />
    </View>
  );
}
```

### Headless player

Optionally, a player can be created in headless mode, already providing it with a source.

```tsx
const playerConfig: PlayerConfiguration = {
  // insert THEOplayer React Native license here  
  license: undefined,
};

const vegaPlayer = await THEOplayer.create(config);
vegaPlayer.source = { /*...*/};
```

The headless player can then be attached to a `THEOplayerView` component later on:

```tsx
<THEOplayerView player={vegaPlayer} />
```
