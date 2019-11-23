import React from 'react';

export default function SubInfo(props) {
  return (
    <span>
      <span>{props.data.totalLeads} Leads</span>
      <span>{props.data.priority}</span>
    </span>
  );
}
