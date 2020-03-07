import React, { useState } from 'react';
import { roles } from '../permissions/permission';
import { useSelector } from 'react-redux';
import { getUserData } from '../store/Auth/selectors';

const when = (bool, value, emptyMessage) => {
  return bool ? value : emptyMessage;
};

const userHasPermission = (userPermissions, permission) => {
  return userPermissions.includes(permission);
};

const WithPermissions = (props) => {
  const { profile } = useSelector(getUserData);
  const { permissions = "" } = roles[profile.role] || [];
  const { permissionDeniedMessage = null } = props;

  return (
    <>
      {props.checkPermissions ?
        when(
          userHasPermission(permissions, props.permission),
          props.children,
          permissionDeniedMessage
        ) : props.children
      }
    </>);
};

export default WithPermissions;
