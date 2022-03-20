import { useState, useRef, forwardRef } from 'react';

import ruleFormStyle from '../../../styles/RuleForm.module.css'
import ruleStyle from '../../../styles/Rule.module.css'


const Field = forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <input ref={ref} type={type} className={ruleFormStyle.form_inline} 
        min="1" max="1_000_000_000"/>
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
    const buyVolumeRef = useRef();
    const sellVolumeRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            buyVolume: buyVolume.current.value,
            sellVolume: sellVolume.current.value,
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <Field ref={buyVolumeRef} label="Buy Volume:" type="number" />
        <Field ref={sellVolumeRef} label="Sell Volume:" type="number" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default RuleForm;