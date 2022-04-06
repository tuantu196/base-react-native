/* eslint-disable quotes */
import { LOCAL_STORAGE_KEYS } from 'src/utils/constants';
import { handleStorage } from 'src/utils/storage';
import { Questionnaire } from 'src/utils/type';
import { QUESTION_SHARE_DATA } from 'src/utils/utils';

export let questionnaire: Questionnaire;
export let cacheKey: string = '';
export let baseUrl = 'src/assets/questionnaire/';

export const getQuestionnaire = (language = 'de'): Promise<Questionnaire> => {
  // TODO implement Update Mechanism
  //   let cachedQuestionnaire = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_KEYS.QUESTIONNAIRE)
  //   );
  //   if (cachedQuestionnaire) {
  //     return new Promise(() => cachedQuestionnaire);
  //   }
  if (questionnaire !== undefined && cacheKey === language) {
    return new Promise((resolve) =>
      resolve(addAdditionalQuestions(questionnaire))
    );
  }
  // Make sure it is ending with a slash
  if (!baseUrl.endsWith('/')) {
    baseUrl = baseUrl + '/';
  }
  console.log('Tube qqq:', `${baseUrl}${language}.json`);
  return fetch(
    `https://raw.githubusercontent.com/CovOpen/CovApp-2.0/master/src/assets/questionnaire/en.json`
  )
    .then((response: Response) => {
      return response.json();
    })
    .then((response) => {
      handleStorage.setItem(
        LOCAL_STORAGE_KEYS.QUESTIONNAIRE,
        JSON.stringify(response)
      );
      questionnaire = { ...response };
      cacheKey = language;

      return addAdditionalQuestions(response);
    });
  // .catch(() => {
  //     // do nothing for now
  //   });
};

function addAdditionalQuestions(
  functionQuestionnaire: Questionnaire
): Questionnaire {
  return {
    ...functionQuestionnaire,
    questions: [...functionQuestionnaire.questions, QUESTION_SHARE_DATA()],
  };
}
