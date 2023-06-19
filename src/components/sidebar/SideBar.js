import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        height: '100%',
        position: 'absolute !important',
        top: '0 !important',
        right: '0 !important',
        backgroundColor: 'rgb(245, 244, 235) !important',
        zIndex: '1000 !important',
        padding: '0 50px !important',
        border: '1px solid black !important',
        justifyContent: 'center !important',
    },
}));

export default function SideBar(props) {
    const classes = useStyles();
    const { open, setOpen } = props;
    const handleSideBarClose = () => {
        setOpen(false);
    }
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
            <CloseIcon
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '50px',
                    cursor: 'pointer'
                }}
                onClick={() => handleSideBarClose()} />
            <Toolbar>

                <List sx={{ p: 0, width: '100%' }}>
                    <ListItem sx={{ pl: 2, pr: 2, width: '100%', pt: '0 !important', pb: '0 !important', }}>
                        <Link
                            style={{
                                textDecoration: 'none',
                                width: '100%',
                                color: 'black',
                                fontSize: '20px',
                                padding: '20px 0',
                                borderTop: '1px solid #676565',
                                textAlign: 'center'
                            }}
                            to={'/search'}>ジム検索</Link>
                    </ListItem>
                    <ListItem sx={{ pl: 2, pr: 2, width: '100%', pt: '0 !important', pb: '0 !important', }}>
                        <Link
                            style={{
                                textDecoration: 'none',
                                width: '100%',
                                color: 'black',
                                fontSize: '20px',
                                padding: '20px 0',
                                borderBottom: '1px solid #676565',
                                borderTop: '1px solid #676565',
                                textAlign: 'center'
                            }}
                            to={'/create_gym'}>ジム登録管理</Link>
                    </ListItem>
                </List>
            </Toolbar>
        </Drawer >
    );
};