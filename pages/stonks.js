import { useEffect, useState } from 'react';

// import {DataPriceSpan} from "../DB/querys.mjs"

// import RuleForm from '../components/rule/RuleForm';
import RuleSet from '../components/rule/RuleSet';
import Options from '../components/graph/Options';
import SuperChart from '../components/graph/graphComponents/SuperChart';
import Button from '../components/Button';
import GenericFinancialChart from '../components/graph/GenericFinancialChart';
import ReactFinancialChart from '../components/graph/ReactFinancialChart';
import Simulator from '../components/rule/sim/Simulator';

import stonkStyles from '../styles/Stock.module.css'
import optionStyles from "../styles/Options.module.css";

const stonks = () => {

  const [ruleDisplay, setRuleDisplay] = useState(false);
  const [statDisplay, setStatDisplay] = useState(false);
  const [search, setSearch] = useState();
  const [priceData, setPriceData] = useState();
  const [rules, setRules] = useState([]);
  const [stats, setStats] = useState();
  const [profits, setProfits] = useState();
  const [simulating, setSimulating] = useState(false);
  const [initialData, setInitialData] = useState();

  const simClick = () => setSimulating(true);
/*
  useEffect(() => {
    // rules.forEach( rule => {
      
    // });
    console.log(rules);
  }, [rules]);
*/
  useEffect(() => {
    if(stats){
      setProfits(stats.shift())
    }
  }, [stats])

  useEffect(() => {

    // console.log(rules);
    console.log("simulation stats");
    console.log(stats);
    setSimulating(false);
  }, [stats]);

  const resetRules = () => {
    setRules([])
    setStatDisplay(false)
  }

  return (
  <div>
    <div className="graph">
      <Options 
        setSearch={setSearch}
        setRuleDisplay={() => setRuleDisplay(!ruleDisplay)}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>
      <GenericFinancialChart search={search} setPriceData={setPriceData} rules={rules} simulating={simulating} stats={stats}/>
      <>{priceData && <p>{priceData[11].ema12}</p>}</>

      <div>
      {ruleDisplay && <RuleSet ruleDisplay={ruleDisplay} rules={rules} setRules={setRules} />}
      {rules.length > 0 && 
        <>
          <Button color={"#EF5350"} text={"reset rules"} onClick={resetRules} />
          <Button color={"#26A69A"} text={"simulate"} onClick={simClick} />
        </>}
      </div>
      

      <>
      {simulating && <Simulator priceData={priceData} rules={rules} setStats={setStats} setStatDisplay={setStatDisplay} setSimulating={setSimulating} />}
      {statDisplay && 
        <>
        <p>{search.stock} TO THE MOON</p>
        {profits && Object.entries(profits).map(([key, value], i) => <p>{key}&emsp;{value}</p> )}
        <table className={stonkStyles.statTable}>
          <thead>
              <tr>
                {Object.entries(stats[1]).map(([key, value], i) => <td key={i}>{key.toUpperCase()}:&emsp;</td> )} 
              </tr>
          </thead>

          <tbody>
            {stats.map((stat, i) =>
                <tr key={i} className={!stat.profit ? 'none' : parseInt(stat.profit) > 0 ? stonkStyles.profit : stonkStyles.loss}> 
                  {Object.entries(stats[i]).map(([key, value], j) => <td key={j}>{value}&emsp;</td> )} 
                </tr>)}
          </tbody>
        </table>
        </>
      } 
      </>
      </div>
  </div>
)};
//<GenericFinancialChart search = {search}/>
export default stonks;


