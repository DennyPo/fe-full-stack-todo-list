import { useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation'
import cookies from "js-cookie";
import { useQuery } from "@apollo/client";

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
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// urls

import { SIGNIN_PAGE } from "../../config/url";

// config

import { MENU_PAGES, TOKEN_NAME } from "../../config/config";

// styles

import styles from "./PageLayout.module.scss";

//Queries

import { GET_CURRENT_USER_QUERY } from "../../../operations/queries";


const PageLayout = (props) => {

  const { children } = props;

  const { client, data } = useQuery(GET_CURRENT_USER_QUERY);
  const router = useRouter();
  const { t } = useTranslation('common');

  const [isSideBar, setIsSideBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const onToggleSideBar = () => setIsSideBar(state => !state);

  const handleCloseLocales = () => setAnchorEl(null);

  return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onToggleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={styles.title}>
              {!_.isEmpty(data) && data.currentUser.email}
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
                    router.push(router.pathname, router.pathname, { locale });
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
          onClose={onToggleSideBar}
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
                  onToggleSideBar();
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
              onClick={() => {
                router.push(SIGNIN_PAGE);
                cookies.remove(TOKEN_NAME);
                client.cache.reset();
              }}
          >
            <ListItemIcon classes={{ root: styles.listItemIcon }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText classes={{ root: styles.listItemText }} primary={t('logout')} />
          </ListItem>
        </Drawer>

        {children}
      </>
  );
};


export default PageLayout;
