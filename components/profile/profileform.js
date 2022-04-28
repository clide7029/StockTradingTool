import { useRef } from 'react';

import profilesFstyles from '../styles/ProfileForm.module.css';
import RuleSet from '../components/rule/RuleSet';
import Options from '../components/graph/Options';
import SuperChart from '../components/graph/graphComponents/SuperChart';
import Button from '../components/Button';
import GenericFinancialChart from '../components/graph/GenericFinancialChart';
import ReactFinancialChart from '../components/graph/ReactFinancialChart';
import Simulator from '../components/rule/sim/Simulator';


function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    
    
    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    });
  }

  return (
    <form className={profilesFstyles.form} onSubmit={submitHandler}>
      <div className={profilesFstyles.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={profilesFstyles.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={profilesFstyles.action}>
        <button>Change Password</button>
      </div>
      <div className={profilesFstyles.control}> 
      <label>Stocks Simulation 1</label> 
      </div>
      <div>
    <div className={profilesFstyles.graph}>
      <Options 
        setSearch={setSearch}
        setRuleDisplay={() => setRuleDisplay(!ruleDisplay)}
        setStatDisplay={() => setStatDisplay(!statDisplay)}
      ></Options>
      <GenericFinancialChart search={search} setPriceData={setPriceData} rules={rules}/>
      <>{priceData && <p>{priceData[11].ema12}</p>}</>

      <>
      {search && <p>{search.stock}<br></br>{search.interval}</p>}

      {rules && rules.map((rule, i) => <div key={i} style={{display:"flex",flexFlow: "row wrap"}}> {Object.entries(rules[i]).map(([key, value]) => <p>{key}:  {value}&emsp;</p> )} </div>)}
      </>
      <div className={profilesFstyles.btn}>
      {ruleDisplay && <RuleSet ruleDisplay={ruleDisplay} rules={rules} setRules={setRules} />}
      {rules.length > 0 && <Button color={"green"} text={"simulate"} onClick={simClick} />}
      {statDisplay && <p>DOGE TO THE MOON</p>}
      </div>
      <>
      {simulating && <Simulator priceData={priceData} rules={rules} setStats={setStats} setStatDisplay={setStatDisplay} setSimulating={setSimulating} />}
      {statDisplay && stats.map((stat, i) => <div key={i} style={{display:"flex",flexFlow: "row wrap"}}> {Object.entries(stats[i]).map(([key, value]) => <p>{key}:  {value}&emsp;</p> )} </div>)}
      </>
    </div>
  </div>
    </form>

    
  );
}

export default ProfileForm;
