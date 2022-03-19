import Rule from './Rule'
import RuleForm from './RuleForm'

const RuleSet = ({ruleCount, rules, setRules}) => {

    let ruleList = [];

    for(let i = 0; i < ruleCount; i++) {
      ruleList.push(<Rule rules={rules} setRules={setRules}></Rule>)
    }


    return (
      <div className="ruleSet">
        <ul>{ruleList}</ul> 
      </div>
      
    )
}

export default RuleSet

/* <Rule rule={rule} setRules={setRules}></Rule> */ 


//   }