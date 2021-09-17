import React from 'react'
import { Grid } from '@material-ui/core'
import { useForm, Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls'
import * as restaurantServices from '../../services/RestaurantServices'

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' }
];
const initialValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'mal',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false
}

function RestaurantForm() {

    const validate = () => {
        let temp = {};
        temp.fullName = values.fullName ? "" : "FullName est requit"
        temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "E-mail invalide"
        temp.mobile = values.mobile.length > 9 ? "" : "Le mobile est invalide"
        temp.city = values.city ? "" : "Le city est requit"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "")
        
    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate())
            window.alert('testing...')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>

                <Grid item xs={6}>
                    <Controls.Input
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={restaurantServices.getDepartmentCollection()}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Mettre en ligne"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />

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
    )
}

export default RestaurantForm
