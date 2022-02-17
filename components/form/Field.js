import React from 'react'

import loginStyle from '../../styles/Login.module.css'

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className={loginStyle.form_label} >{label}</label>
        <input ref={ref} type={type} className={loginStyle.form_input} />
      </div>
    );
});

export default Field;