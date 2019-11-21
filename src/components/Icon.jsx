import React from 'react';

function Icon(props) {
  return (
    <img src={require('../assets/images/icons/' + props.name + '.svg')} width={props.width} alt={props.alt || props.name} className={props.margin}/>
  );
}

export default Icon
