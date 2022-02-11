import { useState } from 'react';


import RuleForm from '../components/rule/RuleForm';
import Options from '../components/graph/Options';

import stonkStyles from '../styles/Stock.module.css'
import optionStyles from "../styles/Options.module.css";

const stonks = () => {

  const [ruleDisplay, setRuleDisplay] = useState(false);
  const [statDisplay, setStatDisplay] = useState(false);

  return (
  <div>
    <div className="graph">
      <Options 
        setRuleDisplay={() => setRuleDisplay(!ruleDisplay)}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>

      <>
      {ruleDisplay && <RuleForm></RuleForm>}
      {statDisplay && <p>DOGE TO THE MOON</p>}
      </>
    </div>
  </div>
)};

export default stonks;
