import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast } from 'react-toastify'
import { Typography } from '@material-ui/core'
import { UnsubscribeSharp } from '@material-ui/icons'

toast.configure();
export const showSuccessNotif = (message) => {
    toast.success(<>
            <UnsubscribeSharp/>
            <Typography
                variant="h6"
            > {message} </Typography>
        </>, {
        position: 'top-center',
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    })
}

export const showWarningNotif = message => {
    toast.warning(<>
            <UnsubscribeSharp/>
            <Typography
                variant="h6"
            > {message} </Typography>
        </>, {
        position: 'top-center',
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    })
}