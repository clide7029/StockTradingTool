import RuleForm from './RuleForm'
import ruleStyle from '../../styles/Rule.module.css'
import ruleFormStyle from '../../styles/RuleForm.module.css'

const RuleSet = ({rules, setRules}) => {


    return (
      <div className="ruleSet">
        <RuleForm rules={rules} setRules={setRules}></RuleForm>
      </div>

    )
}

export default RuleSet

