import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToastComponent from './ToastComponent';
import { getToasts } from '../../store/Toasts/selectors';
import { addNewToast } from '../../store/Toasts/actions';

function ToastContainer() {
  const toasts = useSelector(getToasts);
  const dispatch = useDispatch();

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10000 }}>
      <button
        const
        onClick={() => dispatch(addNewToast({ message: 'this is test toast', title: 'toast' }))}
      >
        ADD TOAST
      </button>
      {toasts.map(({ title, message, id }) => (
        <ToastComponent key={id} title={title} message={message + ' ' + id} />
      ))}
    </div>
  );
}

export default ToastContainer;
