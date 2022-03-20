import { useEffect, useState } from 'react';


import RuleForm from '../components/rule/RuleForm';
import RuleSet from '../components/rule/RuleSet';
import Options from '../components/graph/Options';
import Button from '../components/Button';
import GenericFinancialChart from '../components/graph/GenericFinancialChart';
import ReactFinancialChart from '../components/graph/ReactFinancialChart';
import Simulator from '../components/rule/sim/Simulator';

import stonkStyles from '../styles/Stock.module.css'
import optionStyles from "../styles/Options.module.css";

const stonks = () => {

  const [ruleDisplay, setRuleDisplay] = useState(false);
  const [statDisplay, setStatDisplay] = useState(false);
  const [search, setSearch] = useState({stock: "AAPL", interval:"D"});
  const [priceData, setPriceData] = useState();
  const [rules, setRules] = useState([]);
  const [simulating, setSimulating] = useState(false);
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    // rules.forEach( rule => {
      
    // });
    console.log(rules);
  }, [rules])

  return (
  <div>
    <div className="graph">
      <Options 
        setSearch={setSearch}
        setRuleDisplay={() => setRuleDisplay(!ruleDisplay)}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>
      <GenericFinancialChart search = {search}/>
      <>{priceData && <p>{priceData[11].ema12}</p>}</>

      <>
      {search && <p>{search.stock}<br></br>{search.interval}</p>}

      {rules && rules.map((rule, i) => Object.entries(rules[i]).map(([key, value]) => <p>{value}</p> ))}
      </>
      <>
      {ruleDisplay && <RuleSet ruleDisplay={ruleDisplay} rules={rules} setRules={setRules} /> }
      {rules.length > 0 && <Button color={"green"} text={"simulate"} onclick={() => setSimulating(true)} />}
      {statDisplay && <p>DOGE TO THE MOON</p>}
      </>
      <>
      {simulating && <Simulator priceData={priceData} rules={rules} setSimulating={setSimulating} />}
      </>
    </div>
  </div>
)};

export default stonks;
