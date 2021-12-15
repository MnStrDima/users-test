import { createPortal } from 'react-dom';
import Preloader from '../Preloader/Preloader';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ isActive, setIsActive, children }) {
  return createPortal(
    <div className={isActive ? "modal active" : "modal"} onClick={setIsActive && (() => setIsActive(false))}>
      <div className="modal_content" onClick={e => e.stopPropagation()}>
        {children ? children : <Preloader />}
      </div>
    </div >,
    modalRoot,
  );
}