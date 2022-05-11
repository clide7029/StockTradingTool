import React, {useState} from 'react'

import Simulation from './Simulation';


const Simulator = ({ priceData, rules, setStats, setStatDisplay, setSimulating }) => {

    const sim = new Simulation(priceData, rules);

    const stats = sim.run();

    console.log('stats')
    console.log(stats)

    setStats(stats);
    setStatDisplay(true);

    // setSimulating(false);

    return (
        <>
            <p>simulating...</p>
            {/* {!simulating && stats.map((stat, i) => <p key={i}> {stat} </p>)}; */}
            
        </>
    );

}


export default Simulator;