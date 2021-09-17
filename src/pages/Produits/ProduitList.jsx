import React, { useState, useContext, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles  } from '@material-ui/core'
import {FirebaseContext} from '../../utils/Firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';


function ProduitList() {

    const [productList, setProductLists] = useState([]);

    const firebase = useContext(FirebaseContext);
    const data = firebase.firestore();

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    /* const deleteItem = (item) => {
        if(window.confirm("Voulez vous vraiment supprimé le produit: " + item.name + "?")== true) {
            let quote = firebase.database().ref("restaurant").child(item.id);
            console.log(quoteList)
        } else return;
    } */
    useEffect(() => {
        
        data.collection("restaurant").get().then((docResto) => {
            let list = [];
            docResto.forEach((restos) => {
                data.collection("restaurant").doc(restos.id).collection('produit').get().then((docs) => {
                    
                    docs.forEach((doc) => {
                        let id = doc.id;
                        list.push({ id, restos, ...doc.data() })
                    })
                })
            })
            setProductLists(list);
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
                    {productList.map((row)=> (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{ row.price}</TableCell>
                        <TableCell align="right">{row.restos.fullName}</TableCell>
                        <TableCell align="right">{row.idCategory}</TableCell>
                        <TableCell align="right">{row.hireDate}</TableCell>
                        <TableCell align="right">{
                            <IconButton size={"small"} color={"secondary"} onClick={()=>console.log("bon")}>
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
