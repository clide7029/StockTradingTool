import Rule from './Rule'

const RuleSet = ({ruleCount, rules, setRules}) => {

    // let ruleList = [];

    // for(let i = 0; i < ruleCount; i++) {
    //   ruleList.push(<Rule id={i} rules={rules} setRules={setRules}></Rule>)
    // }


    return (
      <div className="ruleSet">
        <Rule rules={rules} setRules={setRules}></Rule>
      </div>

    )
}

export default RuleSet

/* <Rule rule={rule} setRules={setRules}></Rule> */ 


//   }