import React from 'react';

function Icon(props) {
  console.log("PROPS", props.name);
  return (
    <img src={require('../assets/images/icons/' + props.name + '.svg')} width={props.width || "20px"} alt={props.alt || props.name} className={props.margin} />
  );
}

export default Icon
