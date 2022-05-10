import { useEffect, useState } from 'react'
import EMAForm from './forms/EMAForm'
import ElderForm from './forms/ElderForm'
import VolumeForm from './forms/VolumeForm'
import RSIForm from './forms/RSIForm'
import ForceForm from './forms/ForceForm'
import RiskForm from './forms/RiskForm'
import Button from '../Button'

import ruleStyle from '../../styles/Rule.module.css';
import ruleFormStyle from '../../styles/RuleForm.module.css';


const RuleForm = ({ rules, setRules }) => {

  const [rule, setRule] = useState();
  const [indicator, setIndicator] = useState();
  const [custom, setCustom] = useState();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log(custom)
    if(custom){
      let data = JSON.parse(JSON.stringify(custom));
      setRule({indicator:indicator, ...data});
    }
  }, [custom])

  useEffect(() => {
    if(rule){
      setRules((oldRules) => [...oldRules, rule]);
    }
  }, [rule])

  return (
  <div className={ruleFormStyle.form_box}>
    <form className={ruleFormStyle.form_inline}>
      <select className={ruleStyle.ruleMenu} onChange={e => setIndicator(e.target.value)}>
          <option value={""}>Select Indicator:</option>
          <option value={"EMA"}>EMA</option>
          <option value={"Elder"}>Elder</option>
          <option value={"Volume"}>Volume</option>
          <option value={"RSI"}>RSI</option>
          <option value={"Force"}>Force</option>
          <option value={"Risk"}>Risk/Reward</option>
      </select>

    </form>

      {indicator=="EMA" && <><EMAForm onSubmit={setCustom}/></>}
      {indicator=="Elder" && <><ElderForm onSubmit={setCustom}/></>}
      {indicator=="Volume" && <><VolumeForm onSubmit={setCustom}/></>}
      {indicator=="RSI" && <><RSIForm onSubmit={setCustom}/></>}
      {indicator=="Force" && <><ForceForm onSubmit={setCustom}/></>}
      {indicator=="Risk" && <><RiskForm onSubmit={setCustom}/></>}


      {rules && rules.map((rule, i) => <div key={i} className={ruleStyle.rule}> {Object.entries(rules[i]).map(([key, value]) => <p>{key}:  {value}&emsp;</p> )} </div>)}


  </div>
  )};

export default RuleForm;


// plans for creating ability to remove one rule at a time
// const updateList = rules.map((item) => {
  //   const newRule = item;
  //   if(rule.id === id) {
  //     newRule = {...rule}
  //   }
  //   return newRule;
  // })
  