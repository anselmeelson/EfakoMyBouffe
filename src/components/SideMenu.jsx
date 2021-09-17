import { Drawer as MUIDrawer, ListItem, makeStyles, withStyles, ListItemIcon, ListItemText, List } from '@material-ui/core'
import { CastConnectedRounded, InboxOutlined, ListAltOutlined, PanToolOutlined, PersonAddOutlined, UnsubscribeRounded } from '@material-ui/icons';
import React from 'react'
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053'
    },
    drawer: {
        width: '250px',
    }
})



const SideMenu = (props) => {
    const { history } = props;

    const classes = useStyles();

    const itemList = [
        {
            text: 'Restaurant',
            icon: <InboxOutlined />,
            onClick: () => history.push("/restaurant")
        },
        {
            text: 'Les produits',
            icon: <ListAltOutlined />,
            onClick: () => history.push('/produits')
        },
        {
            text: 'Les catégories',
            icon: <ListAltOutlined />,
            onClick: () => history.push('/category')
        },
        {
            text: 'Parametres',
            icon: <PanToolOutlined />,
            onClick: () => history.push('/')
        },
        {
            text: 'Acceuil',
            icon: <PersonAddOutlined />,
            onClick: () => history.push('/')
        }
    ];

    const { open, setOpen } = props;

    return <MUIDrawer open={open} anchor="left" onClose={()=>setOpen(false)} className={classes.drawer}>
        <List>
            <ListItem  key={"text"} style={{ width: 250, backgroundColor: '#dcdcdc', height: '80px' }}>
                <ListItemIcon> <CastConnectedRounded/> </ListItemIcon>
                <ListItemText primary="Prosper Kan" />
            </ListItem>
        </List>
        <hr/>
        <List>
            {itemList.map((item, index) => {
                const {text, icon, onClick} = item
                return <ListItem button key={text} onClick={onClick} style={{width: 250}}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                </ListItem>
            })}
        </List>
    </MUIDrawer>
}

export default withRouter(SideMenu)

