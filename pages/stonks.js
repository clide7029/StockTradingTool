import { useState } from 'react';


import RuleForm from '../components/rule/RuleForm';
import RuleSet from '../components/rule/RuleSet';
import Options from '../components/graph/Options';
//import ChartComponent from '../components/graph/ChartComponent';
import ReactFinancialChart from '../components/graph/ReactFiniancialChartComponent';
import stonkStyles from '../styles/Stock.module.css'
import optionStyles from "../styles/Options.module.css";

const stonks = () => {

  const [ruleCount, setRuleCount] = useState(0);
  const [statDisplay, setStatDisplay] = useState(false);
  const [search, setSearch] = useState({stock: "AAPL", interval:"D"});
  const [priceData, setPriceData] = useState();
  const [rules, setRules] = useState([])

  return (
  <div>
    <div className="graph">
      <Options 
        setSearch={setSearch}
        ruleCount={ruleCount}
        setRuleCount={setRuleCount}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>


      <>
      {search && <p>{search.stock}<br></br>{search.interval}</p>}
      </>
      <>
      {ruleCount!=0 && <RuleSet ruleCount={ruleCount} rules={rules} setRules={setRules}></RuleSet>}
      {statDisplay && <p>DOGE TO THE MOON</p>}
      </>
    </div>
  </div>
)};

export default stonks;
