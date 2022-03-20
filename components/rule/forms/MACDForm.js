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

const RuleForm = ({onSubmit}) => {
    const shortPeriodRef = useRef();
    const longPeriodRef = useRef();
    const signalRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            shortPeriod: shortPeriodRef.current.value,
            longPeriod: longPeriodRef.current.value,
            signal: signalRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <Field ref={shortPeriodRef} label="Short Period:" type="number" />
        <Field ref={longPeriodRef} label="Long Period:" type="number" />
        <Field ref={signalRef} label="Signal:" type="number" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default RuleForm;