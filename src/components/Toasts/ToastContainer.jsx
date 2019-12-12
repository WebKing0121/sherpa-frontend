import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToastComponent from './ToastComponent';
import { getToasts } from '../../store/Toasts/selectors';
import { addNewToast } from '../../store/Toasts/actions';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
`;

function ToastContainer() {
  const toasts = useSelector(getToasts);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <button
        const
        onClick={() => dispatch(addNewToast({ message: 'this is test toast', title: 'toast' }))}
      >
        ADD TOAST
      </button>
      {toasts.map(({ title, message, id }) => (
        <ToastComponent key={id} title={title} message={message + ' ' + id} />
      ))}
    </Wrapper>
  );
}

export default ToastContainer;
