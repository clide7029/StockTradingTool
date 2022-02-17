import { useState, useRef, forwardRef } from 'react';

import ruleFormStyle from '../../styles/RuleForm.module.css'


const Field = forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className={ruleFormStyle.form_inline} >{label}</label>
        <input ref={ref} type={type} className={ruleFormStyle.form_inline} />
      </div>
    );
});

const RuleForm = ({onSubmit}) => {
    const timePeriodRef = useRef();
    const seriesTypeRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            timePeriod: timePeriodRef.current.value,
            seriesType: seriesTypeRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form className={ruleFormStyle.form_inline} onSubmit={handleSubmit} >
        <Field ref={timePeriodRef} label="Time Period:" type="text" />
        <Field ref={seriesTypeRef} label="Series Type:" type="text" />
        <div>
          <button className={ruleFormStyle.form_inline} type="submit">Submit</button>
        </div>
      </form>
    );
};



export default RuleForm;