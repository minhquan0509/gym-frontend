import React from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        height: 600,
        position: 'fixed',
        top: '64px !important'
    },
  }));

export default function SideBar(props) {
    const classes = useStyles();
    const { open } = props;

    return (
        open &&
        <Drawer
            variant="permanent"
            anchor="right"
            classes={{
                paper: classes.drawerPaper,
            }}
            className='sidebar'
        >
            <Toolbar>
            <List>
                <ListItem button>
                    <Link style={{textDecoration: 'none'}} to={'/search'}>ジム検索</Link>
                </ListItem>
                <ListItem button>
                    <Link style={{textDecoration: 'none'}} to={'/'}>ジム登録</Link>
                </ListItem>
                <ListItem button>
                    <Link style={{textDecoration: 'none'}} to={'/'}>私のジム</Link>
                </ListItem>
            </List>
            </Toolbar>
        </Drawer>
    );
};