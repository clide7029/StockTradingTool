import { useEffect, useState } from 'react';


import RuleForm from '../components/rule/RuleForm';
import RuleSet from '../components/rule/RuleSet';
import Options from '../components/graph/Options';
import SuperChart from '../components/graph/graphComponents/SuperChart';
import GenericFinancialChart from '../components/graph/GenericFinancialChart';
import ReactFinancialChart from '../components/graph/ReactFinancialChart';
import stonkStyles from '../styles/Stock.module.css'
import optionStyles from "../styles/Options.module.css";

const stonks = () => {

  const [ruleCount, setRuleCount] = useState(0);
  const [statDisplay, setStatDisplay] = useState(false);
  const [search, setSearch] = useState({stock: "AAPL", interval:"D"});
  const [priceData, setPriceData] = useState();
  const [rules, setRules] = useState([])
useEffect(() => {
    console.log(rules);
  }, [rules])

  return (
  <div>
    <div className="graph">
      <Options 
        setSearch={setSearch}
        ruleCount={ruleCount}
        setRuleCount={setRuleCount}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>
      <GenericFinancialChart search = {search} rules = {rules}/>
      <>{priceData && <p>{priceData[11].ema12}</p>}</>

      <>
      {search && <p>{search.stock}<br></br>{search.interval}</p>}
      {rules[0] && <p>{rules[0].indicator}<br/>{rules[0].timePeriod}<br/>{rules[0].seriesType}</p>}
      {rules[1] && <p>{rules[1].indicator}<br/>{rules[1].timePeriod}<br/>{rules[1].seriesType}</p>}
      </>
      <>
      {ruleCount!=0 && <RuleSet ruleCount={ruleCount} rules={rules} setRules={setRules}></RuleSet>}
      {statDisplay && <p>DOGE TO THE MOON</p>}
      </>
    </div>
  </div>
)};
//<GenericFinancialChart search = {search}/>
export default stonks;
