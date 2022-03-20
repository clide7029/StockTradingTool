import { useEffect, useState } from 'react'
import RuleForm from './forms/RuleForm'
import EMAForm from './forms/EMAForm'
import MACDForm from './forms/MACDForm'
import VolumeForm from './forms/VolumeForm'
import RSIForm from './forms/RSIForm'
import ForceForm from './forms/ForceForm'

import ruleStyle from '../../styles/Rule.module.css';


const Rule = ({ rules, setRules }) => {

  const [rule, setRule] = useState();
  const [indicator, setIndicator] = useState();
  const [custom, setCustom] = useState();
  const [submitted, setSubmitted] = useState(false);

  // const updateList = rules.map((item) => {
  //   const newRule = item;
  //   if(rule.id === id) {
  //     newRule = {...rule}
  //   }
  //   return newRule;
  // })
  
  useEffect(() => {
    console.log(custom)
    if(!submitted && custom){

      setSubmitted(true);
      let data = JSON.parse(JSON.stringify(custom));
      data.indicator = indicator;
      
      // data = {
      //   indicator:indicator,
      //   timePeriod:custom.timePeriod,
      //   shortPeriod:custom.shortPeriod,
      //   longPeriod:custom.longPeriod,
      //   seriesType:custom.seriesType
      // }
      setRule(data);
      // console.dir(custom)
      // console.dir(data)
    }
  }, [custom])

  useEffect(() => {
    if(rule){
      // setRules(rules);
      setRules((oldRules) => [...oldRules, rule]);
      // setRules((oldRules) => oldRules.filter)
      console.dir(rule);
      console.dir(rules);
    }
  }, [rule])

  useEffect(() => {
    if(indicator){
      setSubmitted(false)
    }
  }, [indicator])

  return (
  <div className={ruleStyle.rule}>
      <select className={ruleStyle.ruleMenu} onChange={e => setIndicator(e.target.value)}>
          <option value={""}>rules:</option>
          <option value={"EMA"}>EMA</option>
          <option value={"MACD"}>MACD</option>
          <option value={"Volume"}>Volume</option>
          <option value={"RSI"}>RSI</option>
          <option value={"Force"}>Force</option>
      </select>

      {indicator=="EMA" && <><EMAForm onSubmit={setCustom}/></>}
      {indicator=="MACD" && <><MACDForm onSubmit={setCustom}/></>}
      {indicator=="Volume" && <><VolumeForm onSubmit={setCustom}/></>}
      {indicator=="RSI" && <><RSIForm onSubmit={setCustom}/></>}
      {indicator=="Force" && <><ForceForm onSubmit={setCustom}/></>}

    

    


  </div>
  )};

export default Rule;


        // {rule && <p>{rule.indicator}</p>}
        // {rule && <p>{rule.shortPeriod}</p>}
        // {rule && <p>{rule.longPeriod}</p>}
        // {rule && <p>{rule.seriesType}</p>}