import { useState, useRef, forwardRef } from 'react';

import optionStyle from '../../styles/Options.module.css'
import ruleStyle from '../../styles/Rule.module.css'


const SearchField = forwardRef(({label, type}, ref) => {
    return (
      <div>
        <input ref={ref} type={type} className={optionStyle.options_inline} 
        min="1" max="5000"/>
      </div>
    );
});

const IntervalMenu = forwardRef(({label}, ref) => {
    return (
      <div>
        <label className={optionStyle.options_inline} >{label}</label>
        <select ref={ref} className={optionStyle.options_inline}>
          <option value={""}>interval:</option>
          <option value={"60"}>1-Hour</option>
          <option value={"D"}>1-Day</option>
          <option value={"W"}>1-Week</option>
          <option value={"M"}>1-Month</option>
      </select>
      </div>
    );
});


const Search = ({onSubmit}) => {
    const searchRef = useRef();
    const intervalRef = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            stock : searchRef.current.value,
            interval : intervalRef.current.value
        }
        onSubmit(data);
    };
    return (
      <form className={optionStyle.options_inline} onSubmit={handleSubmit} >
        <SearchField ref={searchRef} placeholder="select stock" type="search" />
        <IntervalMenu ref={intervalRef} />
        <div>
          <button className={optionStyle.options_inline} type="submit">S</button>
        </div>
      </form>
    );
};

export default Search;