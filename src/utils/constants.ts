import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { Dimensions, Platform } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const ITEM_MOVIE_IMG_RATIO = 2 / 3;
export const MARGIN_HORIZONTAL = 12;
export const ITEM_PER_ROW = 3;
export const TITLE_FONT_SIZE = 22;
export const BOTTOM_SPACE = getBottomSpace();
export const STATUSBAR_HEIGHT = getStatusBarHeight();

export const ITEM_MOVIE_WIDTH =
  (WINDOW_WIDTH - MARGIN_HORIZONTAL * ITEM_PER_ROW - MARGIN_HORIZONTAL) /
  ITEM_PER_ROW;
export const ITEM_MOVIE_HEIGH = ITEM_MOVIE_WIDTH / ITEM_MOVIE_IMG_RATIO;
export const ITEM_WIDTH = WINDOW_WIDTH;

export const LANGUAGE_DEFAULT = 'en';
export const isIOS = Platform.OS === 'ios';
export const isAdroid = Platform.OS === 'android';

export const QUESTIONNAIRE_VERSION = '400';

export const LOCAL_STORAGE_KEYS = {
  ANSWERS: 'answers',
  VERSION: 'version',
  DATA_SENT: 'dataSent',
  EXPORTED: 'exported',
  QUESTIONNAIRE: 'questionnaire',
  QUESTION: 'question',
};
export const ROUTES = {
  QUESTIONNAIRE: '/questionnaire',
  SUMMARY: '/summary',
  LEGAL: '/legal',
  IMPRINT: '/imprint',
  DISCLAIMER: '/disclaimer',
  FAQ: '/faq',
  DATA_PRIVACY: '/data-privacy',
  EXPORT: '/export',
  RECOMMENDATIONS: '/recommendations',
  ANSWERS: '/answers',
};
