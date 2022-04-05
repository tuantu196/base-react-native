import i18n from 'src/locale';
import { Question } from './type';

export const QUESTION_SHARE_DATA = (): Question => {
  return {
    options: [
      {
        scores: {},
        text: i18n.t('q_X1_option0'),
        value: 'yes',
      },
      {
        scores: {},
        value: 'no',
        text: i18n.t('q_X1_option1'),
      },
    ],
    id: 'covapp_data_donation',
    text: i18n.t('q_X1_text'),
    type: 'select',
    details: i18n.t('q_X1_comment'),
  };
};
