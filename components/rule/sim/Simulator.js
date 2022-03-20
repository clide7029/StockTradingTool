import React, {useState} from 'react'

import Simulation from './Simulation';


const Simulator = ({ priceData, rules, setSimulator }) => {

    const sim = new Simulation(priceData, rules);

    const stats = sim.run();


    return (
        <>
        
        </>
    );

}