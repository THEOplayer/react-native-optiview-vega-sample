import {ContentType, StreamDescription, StreamType} from './StreamDescription';
import {AdIntegrationKind} from 'react-native-theoplayer';

export const SOURCES: StreamDescription[] = [
  {
    id: 'dash01',
    title: 'Elephants Dream',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://dash.akamaized.net/dash264/TestCasesHD/2a/qualcomm/1/MultiResMPEG2.mpd',
          type: 'application/dash+xml',
        },
      ],
    },
  },
  {
    id: 'dash01ima',
    title: 'DASH - CSAI - Google IMA pre-roll',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://cdn.theoplayer.com/video/dash/webvtt-embedded-in-isobmff/Manifest.mpd',
          type: 'application/dash+xml',
        },
      ],
      ads: [
        {
          integration: AdIntegrationKind.google_ima,
          sources: {
            src: 'https://cdn.theoplayer.com/demos/ads/vast/dfp-preroll-no-skip.xml',
          },
        },
      ],
    },
  },
  {
    id: 'dash_ima_midroll_vast',
    title: 'DASH - CSAI - Google IMA mid-roll VAST',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://contentserver.prudentgiraffe.com/videos/dash/webvtt-embedded-in-isobmff/Manifest.mpd',
          type: 'application/dash+xml',
        },
      ],
      ads: [
        {
          integration: AdIntegrationKind.google_ima,
          sources: {
            src: 'https://cdn.theoplayer.com/demos/ads/vast/dfp-preroll-no-skip.xml',
          },
          timeOffset: 10,
        },
      ],
    },
  },
  {
    id: 'dash_ima_vmap',
    title: 'DASH - CSAI - Google IMA mid-roll VMAP',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://contentserver.prudentgiraffe.com/videos/dash/webvtt-embedded-in-isobmff/Manifest.mpd',
          type: 'application/dash+xml',
        },
      ],
      ads: [
        {
          integration: AdIntegrationKind.google_ima,
          sources: {
            src: 'https://cdn.theoplayer.com/demos/ads/vmap/vmap-pre-mid-post-no-skip.xml',
          },
        },
      ],
    },
  },
  {
    id: 'dash02',
    title: 'Tears of Steel',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: true,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://media.axprod.net/TestVectors/Cmaf/clear_1080p_h264/manifest.mpd',
          type: 'application/dash+xml',
        },
      ],
      textTracks: [
        {
          label: 'English [en]',
          srclang: 'en',
          src: 'https://download.blender.org/demo/movies/ToS/subtitles/TOS-en.srt',
          kind: 'captions',
          format: 'webvtt',
        },
      ],
    },
  },
  {
    id: 'dash03',
    title: 'Sintel',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://cdn.theoplayer.com/video/dash/webvtt-embedded-in-isobmff/Manifest.mpd',
          type: 'application/dash+xml',
        },
      ],
    },
  },
  {
    id: 'dash04',
    title: 'Livesim2 SegmentTemplate without manifest updates',
    streamType: StreamType.dash,
    contentType: ContentType.live,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://livesim2.dashif.org/livesim2/testpic_2s/Manifest.mpd',
      },
    },
  },
  {
    id: 'dash05',
    title: 'Livesim2 SegmentTemplate with manifest updates every 30s',
    streamType: StreamType.dash,
    contentType: ContentType.live,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://livesim2.dashif.org/livesim2/mup_30/testpic_2s/Manifest.mpd',
      },
    },
  },
  {
    id: 'dash06',
    title: 'Livesim2 SegmentTemplate using $Number$',
    streamType: StreamType.dash,
    contentType: ContentType.live,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://livesim2.dashif.org/livesim2/segtimeline_1/testpic_2s/Manifest.mpd',
      },
    },
  },
  {
    id: 'dash07',
    title:
      'Livesim2 Multi-period SegmentTemplate with a new period every minute.',
    streamType: StreamType.dash,
    contentType: ContentType.live,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: true,
    sourceDescription: {
      sources: {
        src: 'https://livesim2.dashif.org/livesim2/periods_60/continuous_1/testpic_2s/Manifest.mpd',
      },
    },
  },
  {
    id: 'dash08',
    title: 'Envivio SegmentTemplate, live profile',
    streamType: StreamType.dash,
    contentType: ContentType.live,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd',
      },
    },
  },
  {
    id: 'dash09',
    title: '4K SegmentBase',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://dash.akamaized.net/akamai/streamroot/050714/Spring_4Ktest.mpd',
      },
    },
  },
  {
    id: 'dash10',
    title: 'Caminandes 01, Llama Drama (25fps, 75gop, 1080p)',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'http://refapp.hbbtv.org/videos/01_llama_drama_1080p_25f75g6sv3/manifest.mpd',
      },
    },
  },
  {
    id: 'dash11',
    title:
      'Caminandes 02, Gran Dillama (25fps, 75gop, 1080p, KID=1236, subob,evtib) v5',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'http://refapp.hbbtv.org/videos/02_gran_dillama_1080p_25f75g6sv5/manifest_subob_evtib.mpd',
      },
    },
  },
  {
    id: 'dash12',
    title: 'Spring (25fps, 75gop, 1920x804(2.40) h264, KID=148D) v1',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'http://refapp.hbbtv.org/videos/spring_804p_v1/manifest.mpd',
      },
    },
  },
  {
    id: 'dash13',
    title: 'Tears of Steel (Widevine)',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: true,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://storage.googleapis.com/wvmedia/cenc/h264/tears/tears.mpd',
      },
      contentProtection: {
        widevine: {
          licenseAcquisitionURL:
            'https://proxy.uat.widevine.com/proxy?provider=widevine_test',
        },
      },
    },
  },
  {
    id: 'dash_keyos_widevine',
    title: 'Meridian - BuyDRM KeyOS (Widevine) - using DRM Connector',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: true,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://d2jl6e4h8300i8.cloudfront.net/netflix_meridian/4k-18.5!9/keyos-logo/g180-avc_a2.0-vbr-aac-128k/r30/dash-wv-pr/stream.mpd',
          type: 'application/dash+xml',
          contentProtection: {
            integration: 'keyos_buydrm',
            widevine: {
              licenseAcquisitionURL: 'https://wv-keyos.licensekeyserver.com/',
            },
            preferredKeySystems: ['widevine'],
            integrationParameters: {
              'x-keyos-authorization':
                'PEtleU9TQXV0aGVudGljYXRpb25YTUw+PERhdGE+PEdlbmVyYXRpb25UaW1lPjIwMTYtMTEtMTkgMDk6MzQ6MDEuOTkyPC9HZW5lcmF0aW9uVGltZT48RXhwaXJhdGlvblRpbWU+MjAyNi0xMS0xOSAwOTozNDowMS45OTI8L0V4cGlyYXRpb25UaW1lPjxVbmlxdWVJZD4wZmZmMTk3YWQzMzQ0ZTMyOWU0MTA0OTIwMmQ5M2VlYzwvVW5pcXVlSWQ+PFJTQVB1YktleUlkPjdlMTE0MDBjN2RjY2QyOWQwMTc0YzY3NDM5N2Q5OWRkPC9SU0FQdWJLZXlJZD48V2lkZXZpbmVQb2xpY3kgZmxfQ2FuUGxheT0idHJ1ZSIgZmxfQ2FuUGVyc2lzdD0iZmFsc2UiIC8+PFdpZGV2aW5lQ29udGVudEtleVNwZWMgVHJhY2tUeXBlPSJIRCI+PFNlY3VyaXR5TGV2ZWw+MTwvU2VjdXJpdHlMZXZlbD48L1dpZGV2aW5lQ29udGVudEtleVNwZWM+PEZhaXJQbGF5UG9saWN5IC8+PExpY2Vuc2UgdHlwZT0ic2ltcGxlIiAvPjwvRGF0YT48U2lnbmF0dXJlPk1sNnhkcU5xc1VNalNuMDdicU8wME15bHhVZUZpeERXSHB5WjhLWElBYlAwOE9nN3dnRUFvMTlYK1c3MDJOdytRdmEzNFR0eDQydTlDUlJPU1NnREQzZTM4aXE1RHREcW9HelcwS2w2a0JLTWxHejhZZGRZOWhNWmpPTGJkNFVkRnJUbmxxU21raC9CWnNjSFljSmdaUm5DcUZIbGI1Y0p0cDU1QjN4QmtxMUREZUEydnJUNEVVcVJiM3YyV1NueUhGeVZqWDhCR3o0ZWFwZmVFeDlxSitKbWI3dUt3VjNqVXN2Y0Fab1ozSHh4QzU3WTlySzRqdk9Wc1I0QUd6UDlCc3pYSXhKd1ZSZEk3RXRoMjhZNXVEQUVZVi9hZXRxdWZiSXIrNVZOaE9yQ2JIVjhrR2praDhHRE43dC9nYWh6OWhVeUdOaXRqY2NCekJvZHRnaXdSUT09PC9TaWduYXR1cmU+PC9LZXlPU0F1dGhlbnRpY2F0aW9uWE1MPg==',
            },
          },
        },
      ],
    },
  },
  {
    id: 'dash_tears1',
    title: 'Tears of Steel (PlayReady 2.0)',
    streamType: StreamType.dash,
    contentType: ContentType.vod,
    isContentProtected: true,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://profficialsite.origin.mediaservices.windows.net/c51358ea-9a5e-4322-8951-897d640fdfd7/tearsofsteel_4k.ism/manifest(format=mpd-time-csf)',
      },
      contentProtection: {
        playready: {
          licenseAcquisitionURL:
            'https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(persist:false,sl:150)',
        },
      },
    },
  },
  {
    id: 'dash_tears2',
    title: 'Tears of Steel Live (DASH H264 AAC 4K CENC PLAYREADY 2.0)',
    streamType: StreamType.dash,
    contentType: ContentType.live,
    isContentProtected: true,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://profficialsite.origin.mediaservices.windows.net/c51358ea-9a5e-4322-8951-897d640fdfd7/tearsofsteel_4k.ism/manifest(format=mpd-time-csf)',
      },
      contentProtection: {
        playready: {
          licenseAcquisitionURL:
            'https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(persist:false,sl:150)',
        },
      },
    },
  },
  {
    id: 'hls01',
    title: 'Tears of Steel (HLS Clear)',
    streamType: StreamType.hls,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://contentserver.prudentgiraffe.com/tos-hls/tos_h264_main.m3u8',
        },
      ],
    },
  },

  {
    id: 'hls01b',
    title: 'Tears of Steel (HLS H264 AAC 4K CENC PLAYREADY 2.0)',
    streamType: StreamType.hls,
    contentType: ContentType.vod,
    isContentProtected: true,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://profficialsite.origin.mediaservices.windows.net/c51358ea-9a5e-4322-8951-897d640fdfd7/tearsofsteel_4k.ism/manifest(format=m3u8-aapl)',
        },
      ],
      contentProtection: {
        playready: {
          licenseAcquisitionURL:
            'https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(persist:false,sl:150)',
        },
      },
    },
  },
  {
    id: 'hls02',
    title: 'Big Buck Bunny Dark Truths',
    streamType: StreamType.hls,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
        },
      ],
    },
  },
  {
    id: 'hls_venture',
    title: 'The Venture Bros',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://cdn.theoplayer.com/video/adultswim/clip.m3u8',
          type: 'application/x-mpegurl',
        },
      ],
      metadata: {
        title: 'The Venture Bros',
        subtitle: 'Adult Swim',
        album: 'React-Native THEOplayer demos',
        displayIconUri:
          'https://theoplayer-cdn.s3.eu-west-1.amazonaws.com/react-native-theoplayer/temp/THEOPlayer-200x200.png',
        artist: 'THEOplayer',
        type: 'tv-show',
        releaseDate: 'november 29th',
        releaseYear: 1997,
      },
    },
  },
  {
    id: 'hls_bbb',
    title: 'Big Buck Bunny',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
        type: 'application/x-mpegurl',
      },
    },
  },
  {
    id: 'hls_elephantsdream',
    title: 'Elephants Dream',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://cdn.theoplayer.com/video/elephants-dream/playlist-single-audio.m3u8',
        type: 'application/x-mpegurl',
      },
      poster:
        'https://theoplayer-cdn.s3.eu-west-1.amazonaws.com/react-native-theoplayer/temp/THEOPlayer-1200x1200.png',
      metadata: {
        title: 'Elephants Dream',
        subtitle: 'Elephants Dream Subtitle',
        album: 'Elephants Dream Album',
        displayIconUri:
          'https://theoplayer-cdn.s3.eu-west-1.amazonaws.com/react-native-theoplayer/temp/THEOPlayer-200x200.png',
        artist: 'The elephant',
      },
    },
  },
  {
    id: 'hls_ima_preroll',
    title: 'HLS - CSAI - Google IMA pre-roll',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://cdn.theoplayer.com/video/elephants-dream/playlistCorrectionENG.m3u8',
          type: 'application/x-mpegurl',
        },
      ],
      ads: [
        {
          integration: AdIntegrationKind.google_ima,
          sources:
            'https://cdn.theoplayer.com/demos/ads/vast/dfp-preroll-no-skip.xml',
        },
      ],
      poster:
        'https://cdn.theoplayer.com/react-native-theoplayer/temp/THEOPlayer-1200x675.png',
      metadata: {
        title: 'Elephants Dream with Preroll',
        subtitle: 'Elephants Dream with Preroll Subtitle',
        album: 'Elephants Album',
        displayIconUri:
          'https://cdn.theoplayer.com/react-native-theoplayer/temp/THEOPlayer-200x200.png',
        artist: 'The Dream',
      },
    },
  },
  {
    id: 'hls_ima_midroll_vast',
    title: 'HLS - CSAI - Google IMA mid-roll VAST',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://cdn.theoplayer.com/video/elephants-dream/playlistCorrectionENG.m3u8',
          type: 'application/x-mpegurl',
        },
      ],
      ads: [
        {
          integration: AdIntegrationKind.google_ima,
          sources: {
            src: 'https://cdn.theoplayer.com/demos/ads/vast/dfp-preroll-no-skip.xml',
          },
          timeOffset: 10,
        },
      ],
      poster:
        'https://cdn.theoplayer.com/react-native-theoplayer/temp/THEOPlayer-1200x675.png',
      metadata: {
        title: 'Elephants Dream with Midroll',
        subtitle: 'Elephants Dream with Midroll Subtitle',
        album: 'Ellies Album',
        displayIconUri:
          'https://cdn.theoplayer.com/react-native-theoplayer/temp/THEOPlayer-200x200.png',
        artist: 'Ellie',
      },
    },
  },
  {
    id: 'hls_ima_vmap',
    title: 'HLS - CSAI - Google IMA VMAP',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: [
        {
          src: 'https://cdn.theoplayer.com/video/elephants-dream/playlistCorrectionENG.m3u8',
          type: 'application/x-mpegurl',
        },
      ],
      ads: [
        {
          integration: AdIntegrationKind.google_ima,
          sources: {
            src: 'https://cdn.theoplayer.com/demos/ads/vast/dfp-preroll-no-skip.xml',
          },
        },
      ],
      poster:
        'https://cdn.theoplayer.com/react-native-theoplayer/temp/THEOPlayer-1200x675.png',
      metadata: {
        title: 'Elephants Dream with VMAP',
        subtitle: 'Elephants Dream with VMAP Subtitle',
        album: 'Ellies Album',
        displayIconUri:
          'https://cdn.theoplayer.com/react-native-theoplayer/temp/THEOPlayer-200x200.png',
        artist: 'Ellie',
      },
    },
  },
  {
    id: 'hls_starwars',
    title:
      'Star Wars Episode VII - The Force Awakens Official Comic-Con 2015 Reel',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index-daterange.m3u8',
        type: 'application/x-mpegurl',
      },
      metadata: {
        title:
          'Star Wars Episode VII - The Force Awakens Official Comic-Con 2015 Reel',
        displayIconUri:
          'https://theoplayer-cdn.s3.eu-west-1.amazonaws.com/react-native-theoplayer/temp/THEOPlayer-200x200.png',
      },
    },
  },
  {
    id: 'hls_tos_live',
    title: 'Tears of Steel - Live',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.live,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://cph-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
        type: 'application/x-mpegurl',
      },
    },
  },
  {
    id: 'hls_bipbob',
    title: 'Bib bop 16x9',
    streamType: StreamType.hls_mpeg2,
    contentType: ContentType.live,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
        type: 'application/x-mpegurl',
      },
    },
  },
  {
    id: 'mp4_1',
    title: 'Elephants Dream',
    streamType: StreamType.mp4,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://cdn.theoplayer.com/video/elephants-dream.mp4',
      },
    },
  },
  {
    id: 'mp3_1',
    title: 'Bib bop 16x9',
    streamType: StreamType.mp3,
    contentType: ContentType.vod,
    isContentProtected: false,
    hasCaptions: false,
    isMultiPeriod: false,
    sourceDescription: {
      sources: {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
    },
  },
];
