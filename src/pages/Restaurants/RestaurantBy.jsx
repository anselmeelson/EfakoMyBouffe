import React, { useState, useContext, useEffect, Component } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from 'react-router'


function RestaurantBy(props) {
    let { id } = useParams();
    console.log(props.params)
    return (
        <h1> {id} | {"ok"} </h1>
    )
}

export default RestaurantBy
