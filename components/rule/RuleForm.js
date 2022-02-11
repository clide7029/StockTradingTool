import { useState } from 'react';


import ruleStyles from '../../styles/Card.module.css';



const RuleForm = ({ }) => {

    const [rule, setRule] = useState()
    const [custom, setCustom] = useState(false)

  return (
  <div className={ruleStyles.card}>
      <select name="ruleMenu" class="ruleMenu" onChange={e => setRule(e.target.value)}>
          <option value={""}>rules:</option>
          <option value={"SMA"}>SMA</option>
          <option value={"EMA"}>EMA</option>
      </select>

    <>
    {rule=="SMA" && <p>SMA</p>}
    {rule=="EMA" && <p>EMA</p>}
    </>

  </div>
  )};

export default RuleForm;