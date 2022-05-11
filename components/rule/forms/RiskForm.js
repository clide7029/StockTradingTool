import { useState, useRef, forwardRef } from 'react';

import ruleFormStyle from '../../../styles/RuleForm.module.css'
import ruleStyle from '../../../styles/Rule.module.css'


const Field = forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <input ref={ref} type={type} className={ruleFormStyle.form_inline} 
        step='0.1' placeholder='0.00' min="0.00" max="100.00" />
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

const RiskForm = ({onSubmit}) => {
    const upsideCaptureRef = useRef();
    const downsideRiskRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            reward: upsideCaptureRef.current.value,
            risk: downsideRiskRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <Field ref={upsideCaptureRef} label="Upside Capture (%):" type="number"  />
        <Field ref={downsideRiskRef} label="Downside risk (%):" type="number" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default RiskForm;