import { useState } from 'react';


import RuleForm from '../components/rule/RuleForm';
import RuleSet from '../components/rule/RuleSet';
import Options from '../components/graph/Options';
import GenericFinancialChart from '../components/graph/GenericFinancialChart';
import ReactFinancialChart from '../components/graph/ReactFinancialChart';
import stonkStyles from '../styles/Stock.module.css'
import optionStyles from "../styles/Options.module.css";

const stonks = () => {

  const [ruleDisplay, setRuleDisplay] = useState();
  const [statDisplay, setStatDisplay] = useState(false);
  const [search, setSearch] = useState({stock : "TSLA", interval : "D"});
  const [priceData, setPriceData] = useState();
  return (
  <div>
    <div className="graph">
      <Options 
        setSearch={setSearch}
        setRuleDisplay={setRuleDisplay}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>
      <GenericFinancialChart search = {search}/>
      <>{priceData && <p>{priceData[11].ema12}</p>}</>

      <>
      {search && <p>{search.stock}<br></br>{search.interval}</p>}
      </>
      <>
      {ruleDisplay=="show rules" && <RuleSet></RuleSet>}
      {statDisplay && <p>DOGE TO THE MOON</p>}
      </>
    </div>
  </div>
)};

export default stonks;
