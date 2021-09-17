import React, { useState, useContext, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles  } from '@material-ui/core'
import {FirebaseContext} from '../../utils/Firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Link } from '@material-ui/core';
import { useHistory } from 'react-router';
import { RemoveRedEyeOutlined } from '@material-ui/icons';




function CategoryList() {

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
        data.collection("category").get().then((allCategory) => {
            let list = [];
            allCategory.forEach((doc) => {
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
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Désignation</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {quoteList.map((row)=> (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.fullName}</TableCell>
                            <TableCell align="right">{
                                <>
                                    <IconButton size={"small"} color={"primary"} onClick={()=>history.push(`/category/${row.id}`)}>
                                        <RemoveRedEyeOutlined color="primary"/>
                                    </IconButton>
                                    <IconButton size={"small"} color={"secondary"} onClick={()=>history.push('/category/1212')}>
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

export default CategoryList
