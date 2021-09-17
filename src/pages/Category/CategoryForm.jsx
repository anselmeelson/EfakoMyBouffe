import React, { useState, useContext } from 'react'
import { useForm, Form } from '../../components/useForm'
import { Grid } from '@material-ui/core'
import Controls from '../../components/controls/Controls'
import { FirebaseContext } from '../../utils/Firebase';

import { showSuccessNotif } from '../../utils/Notification'
import { MailOutlined, MapOutlined, NatureOutlined, PersonOutlined, PhoneOutlined } from '@material-ui/icons'

const initialValues = {
    id: null,
    fullName: '',
    image: '',
    hireDate: new Date(),
}

function CategoryForm() {


    const firebase = useContext(FirebaseContext);


    const validate = () => {
        let temp = {};
        temp.fullName = values.fullName ? "" : "Désignation est requise"
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

        const { fullName, image, hireDate } = values;

        const id = "CAT-" + new Date().getTime();

        const category = { id, fullName, image, hireDate }
        if (firebase.category(id).set(category)) {
            if (file != null) {
                const storageRef = firebase.storage().ref();
                const restoRef = storageRef.child("category").child(id);
                restoRef.put(file)
            }
            showSuccessNotif('Categorie bien enregistrée');
            setValues(initialValues);
        }


    }

    return (

        <>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <image src={file} />
                        <Controls.Input
                            label="La désignation"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                            icon={<PersonOutlined />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controls.FolderInput
                            name="image"
                            value={values.image}
                            onChange={handleImputFolderChange}
                        />
                    </Grid>
                </Grid>
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
            </Form>
        </>
    )
}

export default CategoryForm
