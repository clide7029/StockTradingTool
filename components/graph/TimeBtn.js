
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

export default TimeBtn;
