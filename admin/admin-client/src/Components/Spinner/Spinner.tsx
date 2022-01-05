import "./Spinner.css"
function Spinner(props: {className: string}) {
  return (
    <div className={`lds-roller ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner ;
