import { Button, TextField, makeStyles, Fab, IconButton } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

function Input(props) {

    const { name, value, error = null, onChange } = props
    const { text, size, color, variant, onClick, ...other } = props;

    const classes = useStyles();
    
    return (
        <>
            <label htmlFor="upload-photo">
            
                <TextField style={{ display: 'none' }}
                    id="upload-photo"
                    type="file"
                    name={name}
                    value={value}
                    size="small"
                    onChange={onChange}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                >Choisir une image</Button>
            </label>
        </>
    )
}

export default Input
