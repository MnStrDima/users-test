import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import modalTransitionStyles from '../../transitionStyles/modalTransition.module.css';
import Preloader from '../Preloader/Preloader';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ isActive, setIsActive, children }) {

  const nodeRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setIsActive(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setIsActive])

  return createPortal(
    <CSSTransition
      appear={true}
      in={isActive}
      timeout={300}
      classNames={modalTransitionStyles}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className={isActive ? "modal active" : "modal"} onClick={setIsActive && (() => setIsActive(false))}>
        <div className="modal_content" onClick={e => e.stopPropagation()}>
          {children ? children : <Preloader />}
        </div>
      </div >
    </CSSTransition>,
    modalRoot,
  );
}

Modal.propTypes = PropTypes.shape({
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func,
  children: PropTypes.node,
}).isRequired;