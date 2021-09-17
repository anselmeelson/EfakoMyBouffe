import { makeStyles, Paper } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import ProduitForm from './ProduitForm'
import ProduitList from './ProduitList'

const useStyles = makeStyles( theme =>({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}));

function Produits() {
    const classes = useStyles();
    return (
        <>
            <PageHeader
                title="Nouveau Produit"
                subTitle="Formulaire de l'article Avec Validation"
                icon={<PeopleOutlineTwoTone fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <ProduitForm />
                <ProduitList/>
            </Paper>
        </>
    )
}

export default Produits;
