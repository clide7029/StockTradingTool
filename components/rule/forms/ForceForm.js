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
          <option value={0}>Magnitude:</option>
          <option value={100_000}>100k</option>
          <option value={1_000_000}>1M</option>
          <option value={10_000_000}>10M</option>
          <option value={1_000_000_000}>1B</option>
      </select>
      </div>
    );
});

//  onChange={e => setRule(e.target.value)}

const RuleForm = ({onSubmit}) => {
    const upForceRef = useRef();
    const downForceRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            upForce: upForceRef.current.value,
            downForce: downForceRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <SeriesMenu ref={upForceRef} label="Up-Force:" />
        <SeriesMenu ref={downForceRef} label="Down-Force:" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default RuleForm;