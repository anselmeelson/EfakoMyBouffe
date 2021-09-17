import React, { useState, useContext, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles  } from '@material-ui/core'
import {FirebaseContext} from '../../utils/Firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';




function ProduitList() {

    const [quoteList, setQuoteList] = useState([]);

    const firebase = useContext(FirebaseContext);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const deleteItem = (item) => {
        if(window.confirm("Voulez vous vraiment supprimé le produit: " + item.name + "?")== true) {
            let quote = firebase.database().ref("restaurant").child(item.id);
            console.log(quoteList)
        } else return;
    }

    useEffect(() => {
        const data = firebase.database().ref("produits");
        data.on('value', (snapshot)=>{
            let previouslist = snapshot.val();
            let list = [];
            for (let id in previouslist) {
                list.push({id, ...previouslist[id]})
            }
            setQuoteList(list);
        });
    }, []);
    
    const classes = useStyles();

    return (
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Désignation</TableCell>
                        <TableCell align="right">Prix</TableCell>
                        <TableCell align="right">Restaurant</TableCell>
                        <TableCell align="right">Catégorie</TableCell>
                        <TableCell align="right">Date d'ajout</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {quoteList.map((row)=> (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{ row.price}</TableCell>
                        <TableCell align="right">{row.idRestaurant}</TableCell>
                        <TableCell align="right">{row.idCategory}</TableCell>
                        <TableCell align="right">{row.hireDate}</TableCell>
                        <TableCell align="right">{
                            <IconButton size={"small"} color={"secondary"} onClick={()=>deleteItem(row)}>
                                <DeleteIcon color="red"/>
                            </IconButton>
                        }</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default ProduitList
