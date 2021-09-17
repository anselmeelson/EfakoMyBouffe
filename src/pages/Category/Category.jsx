import { makeStyles, Paper } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import CategorytForm from './CategoryForm'
import CategoryList from './CategoryList'

const useStyles = makeStyles( theme =>({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}));

function Category() {
    const classes = useStyles();
    return (
        <>
            <PageHeader
                title="Nouvelle Catégorie"
                subTitle="Formulaire de catégorie Avec Validation"
                icon={<PeopleOutlineTwoTone fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <CategorytForm />
                
                <CategoryList/>
            </Paper>
        </>
    )
}

export default Category;
