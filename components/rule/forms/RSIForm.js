import { useState, useRef, forwardRef } from 'react';

import ruleFormStyle from '../../../styles/RuleForm.module.css'
import ruleStyle from '../../../styles/Rule.module.css'


const Field = forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <input ref={ref} type={type} className={ruleFormStyle.form_inline} 
        min="0" max="100`"/>
      </div>
    );
});

const SeriesMenu = forwardRef(({label}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <select ref={ref} className={ruleStyle.ruleMenu}>
          <option value={""}>:</option>
          <option value={"o"}>Open</option>
          <option value={"c"}>Close</option>
          <option value={"h"}>High</option>
          <option value={"l"}>Low</option>
      </select>
      </div>
    );
});

//  onChange={e => setRule(e.target.value)}

const RSIForm = ({onSubmit}) => {
    const overBoughtRef = useRef();
    const overSoldRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            overBought: overBoughtRef.current.value,
            overSold: overSoldRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <Field ref={overBoughtRef} label="Over Bought @:" type="number" />
        <Field ref={overSoldRef} label="Over Sold @:" type="number" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default RSIForm;