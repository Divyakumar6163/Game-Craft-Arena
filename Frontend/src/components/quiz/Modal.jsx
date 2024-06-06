import React from "react";

function Modal({ length }) {
  return (
    <dialog open>
      <h1>Game Over!</h1>
      <p>You scored SCORE out of {length} questions.</p>
    </dialog>
  );
}

export default Modal;
