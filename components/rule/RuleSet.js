import RuleForm from './RuleForm'
import ruleStyle from '../../styles/Rule.module.css'
import ruleFormStyle from '../../styles/RuleForm.module.css'

const RuleSet = ({ruleCount, rules, setRules}) => {

    // let ruleList = [];

    // for(let i = 0; i < ruleCount; i++) {
    //   ruleList.push(<Rule id={i} rules={rules} setRules={setRules}></Rule>)
    // }
// {display:"flex",flexFlow: "row wrap"}

    return (
      <div className="ruleSet">
        <RuleForm rules={rules} setRules={setRules}></RuleForm>
      </div>

    )
}

export default RuleSet

/* <Rule rule={rule} setRules={setRules}></Rule> */ 


//   }