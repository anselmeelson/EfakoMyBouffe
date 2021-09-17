import React, { useState, useContext, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles  } from '@material-ui/core'
import {FirebaseContext} from '../../utils/Firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Link } from '@material-ui/core';
import RestaurantBy from './RestaurantBy';
import { useHistory } from 'react-router';
import Controls from '../../components/controls/Controls';
import { RemoveRedEyeOutlined } from '@material-ui/icons';




function RestaurantList() {

    const [quoteList, setQuoteList] = useState([]);
    let history = useHistory();

    const firebase = useContext(FirebaseContext);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    /* const deleteItem = (item) => {
        if(window.confirm("Voulez vous vraiment supprimé le restaurant: " + item.fullName + "?")=== true) {
            let quote = firebase.database().ref("restaurant").child(item.id);
            console.log(quoteList)
        } else return;
    } */

    useEffect(() => {
        const data = firebase.firestore();
        data.collection("restaurant").get().then((allRestaurant) => {
            let list = [];
            allRestaurant.forEach((doc) => {
                let id = doc.id;
                list.push({id, ...doc.data()})
            })
            setQuoteList(list);
            
        })
    }, []);
    
    console.log(quoteList);
    
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
                                <>
                                    <IconButton size={"small"} color={"primary"} onClick={()=>history.push(`/restaurant/${row.id}`)}>
                                        <RemoveRedEyeOutlined color="primary"/>
                                    </IconButton>
                                    <IconButton size={"small"} color={"secondary"} onClick={()=>history.push('/restaurant/1212')}>
                                        <DeleteIcon color="red"/>
                                    </IconButton>
                                </>
                            }</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default RestaurantList
