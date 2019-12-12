/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeAToast } from '../../store/Toasts/actions';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const ToastComponent = ({ title, message }) => {
  const [show, setShow] = useState(true);

  const toggle = () => setShow(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setShow(false);
    }, 3400);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Toast isOpen={show}>
      <ToastHeader toggle={toggle}>{title}</ToastHeader>
      <ToastBody>{message}</ToastBody>
    </Toast>
  );
};

export default ToastComponent;
