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
      setRule({
        indicator:indicator,
        timePeriod:custom.timePeriod,
        seriesType:custom.seriesType
      });
      // setRules(rules.push(rule));
      // console.log(rules)
      console.dir(rule)
    }
    }, [custom])

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
    {custom && <p>{custom.timePeriod}</p>}
    {custom && <p>{custom.seriesType}</p>}
    </>


  </div>
  )};

export default Rule;
