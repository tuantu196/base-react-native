import { LOCAL_STORAGE_KEYS, QUESTIONNAIRE_VERSION } from './constants';
import { handleStorage } from './storage';

//TODO: Use JSON Questionnaire Version
const match = async (): Promise<boolean> => {
  const setVersion = handleStorage.getItem(LOCAL_STORAGE_KEYS.VERSION);
  return (await setVersion) === QUESTIONNAIRE_VERSION;
};

const set = () => {
  handleStorage.setItem(LOCAL_STORAGE_KEYS.VERSION, QUESTIONNAIRE_VERSION);
};

// const reset = () => {
//   settings.remove(COMPLETED);

//   for (const key in LOCAL_STORAGE_KEYS) {
//     handleStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
//   }
// };

const version = {
  match,
  set,
  // reset,
};

export default version;
