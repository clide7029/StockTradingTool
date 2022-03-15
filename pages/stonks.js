import { useState } from 'react';


import RuleForm from '../components/rule/RuleForm';
import RuleSet from '../components/rule/RuleSet';
import Options from '../components/graph/Options';
//import ChartComponent from '../components/graph/ChartComponent';
import ReactFinancialChart from '../components/graph/ReactFiniancialChartComponent';
import stonkStyles from '../styles/Stock.module.css'
import optionStyles from "../styles/Options.module.css";

const stonks = () => {

  const [ruleDisplay, setRuleDisplay] = useState();
  const [statDisplay, setStatDisplay] = useState(false);

  return (
  <div>
    <div className="graph">
      <Options 
        setRuleDisplay={setRuleDisplay}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>
      <ReactFinancialChart/> 

      <>
      {ruleDisplay=="show rules" && <RuleSet></RuleSet>}
      {statDisplay && <p>DOGE TO THE MOON</p>}
      </>
    </div>
  </div>
)};

export default stonks;
