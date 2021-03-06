import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import notificationTransitionStyles from '../../transitionStyles/notificationTransition.module.css';
import styles from './Notification.module.css';

export default function Notification({ notificationInit, message }) {
    const [isVisible, setIsVisible] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        if (notificationInit) {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 3000);
        }
        return () => {
            setIsVisible(false);
        };
    }, [notificationInit]);

    return (
        <CSSTransition
            in={isVisible}
            timeout={250}
            classNames={notificationTransitionStyles}
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className={styles.wrapper}>
                <p className={styles.message}>{message}</p>
            </div>
        </CSSTransition>
    );
}

Notification.propTypes = PropTypes.shape({
    message: PropTypes.string.isRequired,
    notificationInit: PropTypes.bool.isRequired,
}).isRequired;