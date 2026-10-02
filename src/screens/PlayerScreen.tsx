import React, {useState} from 'react';
import {DOLBY_LICENSE_KEY} from '@env';
import {StyleSheet, TextStyle, View} from 'react-native';
import {StackScreenProps} from '@amazon-devices/react-navigation__stack';
import {AppStackParamList, Screens} from '../navigation/nagivation';
import {
  PlayerEventType,
  sdkVersions,
  THEOplayer,
  THEOplayerView,
  VegaFeatures,
  VegaPlayerConfiguration,
} from '@dolby-optiview/react-native-vega';
import {
  AutoFocusGuide,
  CenteredControlBar,
  CenteredDelayedActivityIndicator,
  ControlBar,
  DEFAULT_THEOPLAYER_THEME,
  LanguageMenuButton,
  MuteButton,
  PlaybackRateSubMenu,
  PlayButton,
  QualitySubMenu,
  SeekBar,
  SettingsMenuButton,
  Spacer,
  TimeLabel,
  UiContainer,
} from '@theoplayer/react-native-ui';

// Copy .env.example to .env and set DOLBY_LICENSE_KEY to avoid hardcoding the license.
// Babel embeds it in the app bundle; restart Metro with --reset-cache after editing .env.
// A missing or blank value leaves the license unset.
const playerConfig: VegaPlayerConfiguration = {
  license: DOLBY_LICENSE_KEY?.trim() || undefined, // Add your THEOplayer React Native license key here
  features: [VegaFeatures.LOGIX_IMA_ADS],
};

const LOG_TAG = 'THEOVega';

const DEFAULT_VEGA_THEME = {
  ...DEFAULT_THEOPLAYER_THEME,
  fadeAnimationTimoutMs: Infinity,
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
  } as TextStyle,
  dimensions: {
    controlBarHeight: 36,
    centerControlBarHeight: 44,
  },
};

export const PlayerScreen = ({
  // navigation,
  route,
}: StackScreenProps<AppStackParamList, Screens.PLAYER_SCREEN>) => {
  const {stream} = route.params;
  const [player, setPlayer] = useState<THEOplayer | undefined>(undefined);
  const styles = getStyles();

  const onPlayerReady = async (_player: THEOplayer) => {
    console.log(LOG_TAG, `player ready v${(await sdkVersions()).rn}`);
    setPlayer(_player);

    _player.addEventListener(PlayerEventType.SOURCE_CHANGE, console.log);
    _player.addEventListener(PlayerEventType.PLAY, console.log);
    _player.addEventListener(PlayerEventType.PLAYING, console.log);
    _player.addEventListener(PlayerEventType.ERROR, console.log);

    _player.autoplay = true;
    _player.source = stream.sourceDescription;
  };

  return (
    <View style={styles.container}>
      <THEOplayerView config={playerConfig} onPlayerReady={onPlayerReady}>
        {player && (
          <UiContainer
            theme={DEFAULT_VEGA_THEME}
            player={player}
            behind={<CenteredDelayedActivityIndicator size={25} />}
            top={
              <AutoFocusGuide>
                <ControlBar>
                  <Spacer />
                  <LanguageMenuButton />
                  <SettingsMenuButton>
                    <QualitySubMenu />
                    <PlaybackRateSubMenu />
                  </SettingsMenuButton>
                </ControlBar>
              </AutoFocusGuide>
            }
            center={<CenteredControlBar middle={<PlayButton />} />}
            bottom={
              <AutoFocusGuide>
                <ControlBar>
                  <SeekBar />
                </ControlBar>
                <ControlBar>
                  <MuteButton />
                  <TimeLabel showDuration={true} />
                  <Spacer />
                </ControlBar>
              </AutoFocusGuide>
            }
          />
        )}
      </THEOplayerView>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
