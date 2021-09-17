import React, { useState, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { useForm, Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls'
import { FirebaseContext } from '../../utils/Firebase';
import Services from '../../services/Services';
import { showSuccessNotif } from '../../utils/Notification'

const initialValues = {
    id: null,
    name: '',
    price: '',
    idRestaurant: '',
    description: '',
    idCategory: '',
    image: '',
    hireDate: new Date(),
}

function ProduitForm() {

    const firebase = useContext(FirebaseContext);

    const validate = () => {
        let temp = {};
        temp.name = values.name ? "" : "Nom dur produit est requit"
        temp.price = values.price ? "" : "Le prix est requit"
        temp.description = values.name ? "" : "La description est requit"
        //temp.mobile = values.mobile.length > 9 ? "" : "Le mobile est invalide"
        setErrors({
            ...temp
        });

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
            createProduit();
            setValues(initialValues);
        }
    }

    const createProduit = () => {

        const { name, price, idRestaurant, idCategory, description, hireDate } = values;

        const id = "P-" + new Date().getTime();

        const restoDB = firebase.database().ref("produits");

        const produit = { name, price, idRestaurant, idCategory, description, hireDate }
        if (restoDB.push(produit)) {
            if (file != null) {
                const storageRef = firebase.storage().ref();
                const restoRef = storageRef.child(id);
                restoRef.put(file)
            }
            showSuccessNotif("Produit bien ajouté")
        }

    }

    return (

        <>
            <Form onSubmit={handleSubmit}>
                <Grid container>

                    <Grid item xs={12} sm={6}>
                        <image src={file} />
                        <Controls.Input
                            label="Désignation du produit"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            error={errors.name}
                        />
                        <Controls.Input
                            label="Prix du produit"
                            name="price"
                            value={values.price}
                            onChange={handleInputChange}
                            error={errors.price}
                        />

                        <Grid container item>
                            <Grid item sm={7}>
                                <Controls.Select
                                    name="idRestaurant"
                                    label="Restaurant"
                                    value={values.idRestaurant}
                                    onChange={handleInputChange}
                                    options={Services("restaurant")}
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <Controls.Button
                                    type="button"
                                    size="large"
                                    text="+"
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controls.Select
                            name="idCategory"
                            label="Catégorie"
                            value={values.idCategory}
                            onChange={handleInputChange}
                            options={Services("restaurant")}
                        />
                        <Controls.Input
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleInputChange}
                            error={errors.description}
                            multiline
                        />
                        <Controls.FolderInput
                            name="image"
                            value={values.image}
                            onChange={handleImputFolderChange}
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

export default ProduitForm;
