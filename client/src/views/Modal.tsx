import React from 'react';

function Modal(props:any){

  const {
    onCloseRequest,
    children
  } = props;
  return (
    <div className='modal-overlay'>
      <button type="button" className='close-button' onClick={onCloseRequest}>
        X
      </button>
      <div className='modal-content'>
        {children}
      </div>
    </div>
  );

}
export default Modal