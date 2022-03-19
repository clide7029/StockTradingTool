import { useEffect, useState } from 'react'
import RuleForm from './RuleForm'

import ruleStyle from '../../styles/Rule.module.css';


const Rule = ({ rules, setRules }) => {

    const [rule, setRule] = useState()
    const [indicator, setIndicator] = useState()
    const [custom, setCustom] = useState()

  useEffect(() => {
    console.log(custom)
    if(custom){

      const data = {
        indicator:indicator,
        timePeriod:custom.timePeriod,
        seriesType:custom.seriesType
      }
      setRule(data);
      // console.dir(custom)
      // console.dir(data)
    }
  }, [custom])

  useEffect(() => {
    if(rule){
      setRules((oldRules) => [...oldRules, rule]);
      console.dir(rule);
      console.dir(rules);
    }
  }, [rule])

  return (
  <div className={ruleStyle.rule}>
      <select className={ruleStyle.ruleMenu} onChange={e => setIndicator(e.target.value)}>
          <option value={""}>rules:</option>
          <option value={"SMA"}>SMA</option>
          <option value={"EMA"}>EMA</option>
      </select>

    <div>
      <RuleForm onSubmit={setCustom}></RuleForm>
    </div>

    <>
    {rule && <p>{rule.indicator}</p>}
    {rule && <p>{rule.timePeriod}</p>}
    {rule && <p>{rule.seriesType}</p>}
    </>

    


  </div>
  )};

export default Rule;
