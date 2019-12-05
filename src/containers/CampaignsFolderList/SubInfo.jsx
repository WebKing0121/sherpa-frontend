import React from 'react';

export default function SubInfo(props) {
  return (
    <span>
      <span>{props.data.totalCampaigns} Campaigns</span>
    </span>
  );
}
