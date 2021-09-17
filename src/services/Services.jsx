import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../utils/FirebaseContext";

export function getRestaurant(firebase) {
    const data = firebase.firestore();
    let result = [];
    data.collection("restaurant").get().then((allRestaurant) => {
        let list = [];
        allRestaurant.forEach((doc) => {
            let id = doc.id;
            list.push({id, ...doc.data()})
        })
        result = list;
    })
    return result;
}
/* export const AllRestaurant = () => ([
    { id: '1', title: 'Bar Chicha' },
    { id: '2', title: 'Petit Noir' },
    { id: '3', title: 'Charwama House' },
]); */



