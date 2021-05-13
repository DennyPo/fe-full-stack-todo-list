import { HOME_PAGE, USERS_PAGE } from "./url";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';


export const TOKEN_NAME = 'starter_token';
export const REFRESH_TOKEN_NAME = 'refresh_starter_token';

export const MENU_PAGES = t => ([
  { text: t('home'), link: HOME_PAGE, Icon: HomeIcon },
  { text: t('users'), link: USERS_PAGE, Icon: PeopleIcon },
]);
