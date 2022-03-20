import { useState } from 'react';
import Button from "../Button"
import Search from "../graph/Search"
import optionStyles from '../../styles/Options.module.css';
import PropTypes from 'prop-types'





const Options = ({ setSearch, setRuleDisplay, setStatDisplay }) => {


    return (
        <nav className={optionStyles.options}>
        <ul>
            <li>
                <Search onSubmit={setSearch}></Search>
            </li>
            <li>
            <Button onClick={setRuleDisplay} text="&#8475;"></Button>
            </li>
            <li>
            <Button onClick={setStatDisplay} text="&#36;"></Button>
            </li>
        </ul>
        </nav>
    )};


Options.propTypes = {
  setDisplay: PropTypes.func,
}

    

export default Options;
