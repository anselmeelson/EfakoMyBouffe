import { makeStyles, Paper } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import RestaurantForm from './UsersForm'

const useStyles = makeStyles( theme =>({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}));

function Restaurants() {
    const classes = useStyles();
    return (
        <>
            <PageHeader
                title="Nouveau Restaurant"
                subTitle="Formulaire de l'article Avec Validation"
                icon={<PeopleOutlineTwoTone fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <RestaurantForm/>
            </Paper>
        </>
    )
}

export default Restaurants;
