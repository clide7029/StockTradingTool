import PropTypes from 'prop-types'
import buttonStyle from '../styles/Button.module.css'

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={buttonStyle.btn}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'gray',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
