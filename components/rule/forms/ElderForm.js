import { useState, useRef, forwardRef } from 'react';

import ruleFormStyle from '../../../styles/RuleForm.module.css'
import ruleStyle from '../../../styles/Rule.module.css'


const Field = forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <input ref={ref} type={type} className={ruleFormStyle.form_inline} 
        min="1" max="5000"/>
      </div>
    );
});

const SeriesMenu = forwardRef(({label}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <select ref={ref} className={ruleStyle.ruleMenu}>
          <option value={""}>seriesType:</option>
          <option value={"o"}>Open</option>
          <option value={"c"}>Close</option>
          <option value={"h"}>High</option>
          <option value={"l"}>Low</option>
      </select>
      </div>
    );
});

//  onChange={e => setRule(e.target.value)}

const ElderForm = ({onSubmit}) => {
    const buyPowerRef = useRef();
    const sellPowerRef = useRef();
    const emaRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            buyPower: buyPowerRef.current.value,
            sellPower: sellPowerRef.current.value,
            ema: emaRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <Field ref={emaRef} label="EMA Period:" type="number" />
        <Field ref={buyPowerRef} label="Buy Power Signal:" type="number" />
        <Field ref={sellPowerRef} label="Sell Power Signal:" type="number" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default ElderForm;