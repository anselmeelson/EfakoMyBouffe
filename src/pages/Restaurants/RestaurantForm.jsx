import React, { useState, useContext } from 'react'
import { useForm, Form } from '../../components/useForm'
import { Grid } from '@material-ui/core'
import Controls from '../../components/controls/Controls'
import {FirebaseContext} from '../../utils/Firebase';

import { showSuccessNotif } from '../../utils/Notification'
import {  MailOutlined, MapOutlined, NatureOutlined, PersonOutlined, PhoneOutlined } from '@material-ui/icons'

const initialValues = {
    id: null,
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    image: '',
    adress: '',
    hireDate: new Date(),
}

function RestaurantForm() {


    const firebase = useContext(FirebaseContext);
    

    const validate = () => {
        let temp = {};
        temp.fullName = values.fullName ? "" : "FullName est requit"
        temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "E-mail invalide"
        //temp.mobile = values.mobile.length > 9 ? "" : "Le mobile est invalide"
        temp.city = values.city ? "" : "Le city est requit"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")

    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues);
    const [file, setFile] = useState(null);

    const handleImputFolderChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            createRestaurant();
        }
    }

    const createRestaurant = () => {

        const { fullName, email, mobile, city, adress, hireDate } = values;

        const id = "R-" + new Date().getTime();
        
        const restaurant = {id, fullName, email, mobile, city, adress, hireDate }
        if (firebase.restaurant(id).set(restaurant)) {
            if (file != null) {
                const storageRef = firebase.storage().ref();
                const restoRef = storageRef.child(id);
                restoRef.put(file)
            }
            showSuccessNotif('Restaurant bien enregistré');
            setValues(initialValues);
        }
        
    
    }

    return (
        
        <>
            <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <image src={ file }/>
                    <Controls.Input
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                        icon= {<PersonOutlined/>}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        icon= {<MailOutlined/>}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                        icon= {<PhoneOutlined/>}
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        icon= {<NatureOutlined/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.FolderInput
                        name="image"
                        value={values.image}
                        onChange={handleImputFolderChange}
                    />
                    <Controls.Input
                        name="adress"
                        label="Adress"
                        value={values.adress}
                        onChange={handleInputChange}
                        error={errors.adress}
                        icon= {<MapOutlined/>}
                    />
                    {/*
                    <Controls.Select
                        name="adress"
                        label="Adress"
                        value={values.adress}
                        onChange={handleInputChange}
                        options={restaurantServices.getDepartmentCollection()}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    /> */}
                    <div>
                        <Controls.Button
                            type="submit"
                            size="small"
                            text="Soumettre"
                        />
                        <Controls.Button
                            type="reset"
                            color="default"
                            size="small"
                            text="Annuler"
                        />
                    </div>
                </Grid>
              
            </Grid>
        </Form>
        </>
    )
}

export default RestaurantForm
