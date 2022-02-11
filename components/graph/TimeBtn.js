import PropTypes from 'prop-types'

const TimeBtn = (props) => {
  return (
  <div>
      <button>{props.interval}</button>
  </div>
  )};

TimeBtn.defaultProps = {
    interval: "1D",
    range: "1M"
};

TimeBtn.propTypes = {
  interval: PropTypes.string,
  range: PropTypes.string
}

export default TimeBtn;
