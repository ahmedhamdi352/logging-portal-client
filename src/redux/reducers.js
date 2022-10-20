import App from './app/reducer';
import Auth from './auth/reducer';
import Toaster from './toaster/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import documents from './documents/reducer';
import setting from './setting/reducer';
import notification from './notification/reducer';
import role from './role/reducer';

export default {
  App,
  Auth,
  documents,
  setting,
  notification,
  role,
  Toaster,
  ThemeSwitcher,
  LanguageSwitcher,
};
