import React, { useState, useContext, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles  } from '@material-ui/core'
import {FirebaseContext} from '../../utils/Firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';




function RestaurantList() {

    const [quoteList, setQuoteList] = useState([]);

    const firebase = useContext(FirebaseContext);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const deleteItem = (item) => {
        if(window.confirm("Voulez vous vraiment supprimé le restaurant: " + item.fullName + "?")=== true) {
            let quote = firebase.database().ref("restaurant").child(item.id);
            console.log(quoteList)
        } else return;
    }

    useEffect(() => {
        const data = firebase.database().ref("restaurant");
        data.on('value', (snapshot)=>{
            let previouslist = snapshot.val();
            let list = [];
            for (let id in previouslist) {
                list.push({id, ...previouslist[id]})
                console.log(list)
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
                        <TableCell>Nom Restaurant</TableCell>
                        <TableCell align="right">Téléphone</TableCell>
                        <TableCell align="right">Ville</TableCell>
                        <TableCell align="right">Adresse mail</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {quoteList.map((row)=> (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.fullName}
                        </TableCell>
                        <TableCell align="right">{row.mobile}</TableCell>
                        <TableCell align="right">{row.city}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
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

export default RestaurantList
