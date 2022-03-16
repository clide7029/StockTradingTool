import { useState } from 'react'
import RuleForm from './RuleForm'

import ruleStyle from '../../styles/Rule.module.css';


const Rule = ({ }) => {

    const [rule, setRule] = useState()
    const [custom, setCustom] = useState(false)


  return (
  <div className={ruleStyle.rule}>
      <select className={ruleStyle.ruleMenu} onChange={e => setRule(e.target.value)}>
          <option value={""}>rules:</option>
          <option value={"SMA"}>SMA</option>
          <option value={"EMA"}>EMA</option>
      </select>

      <select className={ruleStyle.ruleMenu} onChange={e => setCustom.timePeriod(e.target.value)}>
          <option value={""}>rules:</option>
          <option value={"SMA"}>SMA</option>
          <option value={"EMA"}>EMA</option>
      </select>

    <div>
      <RuleForm onSubmit={setCustom}></RuleForm>
    </div>

    <>
    {custom && <p>{custom.timePeriod}</p>}
    {custom && <p>{custom.seriesType}</p>}
    </>

    <>
    {rule=="SMA" && <p>SMA</p>}
    {rule=="EMA" && <p>EMA</p>}
    </>

  </div>
  )};

export default Rule;
