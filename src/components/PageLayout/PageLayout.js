import { useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation'
import { useMutation, useQuery } from "@apollo/client";

import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Container
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// urls

import { SIGNIN_PAGE } from "../../config/url";

// config

import { MENU_PAGES, REFRESH_TOKEN_NAME, TOKEN_NAME } from "../../config/config";

// styles

import styles from "./PageLayout.module.scss";

// Operations

import { GET_CURRENT_USER_QUERY } from "../../../operations/queries";
import { LOGOUT_MUTATION } from "../../../operations/mutations";

// Utils

import { getCookie, removeCookie } from "../../utils/cookiesUtils";


const PageLayout = (props) => {

  const { children } = props;

  const { client, data } = useQuery(GET_CURRENT_USER_QUERY);
  const [logout] = useMutation(LOGOUT_MUTATION);


  const router = useRouter();
  const { t } = useTranslation('common');

  const [isSideBar, setIsSideBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleSideBar = () => setIsSideBar(state => !state);

  const handleCloseLocales = () => setAnchorEl(null);

  const handleLogout = async () => {
    const refreshToken = getCookie(REFRESH_TOKEN_NAME);

    if (refreshToken) {
      await logout({
        variables: {
          refreshToken
        }
      });

      removeCookie(REFRESH_TOKEN_NAME);
    }

    removeCookie(TOKEN_NAME);
    router.push(SIGNIN_PAGE);
    client.cache.reset();
  }

  return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={styles.title}>
              {!_.isEmpty(data) && data.currentUser.name}
            </Typography>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={e => setAnchorEl(e.currentTarget)}
                color='inherit'
            >
              {router.locale}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleCloseLocales}
            >
              {router.locales.map(locale => (
                <MenuItem
                  key={locale}
                  onClick={() => {
                    router.push(router.asPath, router.asPath, { locale });
                    handleCloseLocales();
                  }}
                >
                  {_.toUpper(locale)}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          open={isSideBar}
          onClose={handleToggleSideBar}
          classes={{
            paper: styles.sidebar
          }}
        >
          <List
            classes={{
              root: styles.list
            }}
          >
            {MENU_PAGES(t).map(({ text, link, Icon }) => (
              <ListItem
                button
                key={text}
                classes={{
                  root: styles.listItem
                }}
                onClick={() => {
                  router.push(link);
                  handleToggleSideBar();
                }}
              >
                <ListItemIcon classes={{ root: styles.listItemIcon }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText classes={{ root: styles.listItemText }} primary={text} />
              </ListItem>
            ))}
          </List>
          <ListItem
              button
              classes={{
                root: styles.listItem
              }}
              onClick={handleLogout}
          >
            <ListItemIcon classes={{ root: styles.listItemIcon }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText classes={{ root: styles.listItemText }} primary={t('logout')} />
          </ListItem>
        </Drawer>

        <Container maxWidth="sm" classes={{ root: styles.container }}>
          {children}
        </Container>
      </>
  );
};


export default PageLayout;
