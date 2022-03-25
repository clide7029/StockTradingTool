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

const VolumeMenu = forwardRef(({label}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <select ref={ref} className={ruleStyle.ruleMenu}>
          <option value={0}>Volume:</option>
          <option value={100_000}>100k</option>
          <option value={500_000}>500k</option>
          <option value={1_000_000}>1M</option>
          <option value={2_000_000}>2M</option>
          <option value={5_000_000}>5M</option>
          <option value={10_000_000}>10M</option>
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
            buyVolume: buyVolumeRef.current.value,
            sellVolume: sellVolumeRef.current.value,
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <VolumeMenu ref={buyVolumeRef} label="Buy Volume:" type="number" />
        <VolumeMenu ref={sellVolumeRef} label="Sell Volume:" type="number" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default RuleForm;