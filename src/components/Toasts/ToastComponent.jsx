/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import styled from 'styled-components';

const ShAlert = styled(Alert)`
  margin: var(--pad2) var(--pad2) var(--pad1) !important;
  transition: top 0.3s;
`;

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
    <ShAlert color='warning' isOpen={show} toggle={toggle}>
      {message}
    </ShAlert>
  );
};

export default ToastComponent;
