import { Icon, IconButton, TextField } from '@material-ui/core'
import { Person } from '@material-ui/icons'
import React from 'react'

function Input(props) {

    const { name, label, value, error = null, onChange, ...other } = props
    
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            size="small"
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <Icon>
                        {other.icon }
                    </Icon>
                )
            }}
            
            {...other}
        />
    )
}

export default Input
