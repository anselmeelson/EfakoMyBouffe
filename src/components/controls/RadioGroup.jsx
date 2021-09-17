import { FormControl, FormControlLabel, RadioGroup as MuiRadioGroup, FormLabel, Radio, TextField } from '@material-ui/core'
import React from 'react'

function RadioGroup(props) {

    const { name, label, value, onChange, items } = props
    
    return (
        <FormControl size="small">
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                 size="small"
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map(
                        (item, index) => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio/>} label={item.title} /> 
                        )
                    )
                }  
            </MuiRadioGroup>
        </FormControl>
    )
}

export default RadioGroup
