import React, { useState } from 'react';
import './confirm.module.css';

const Notification = () => {
    const [isVisible, setIsVisible] = useState(true);

    const closeNotification = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="notification">
                <button className="notification-close" onClick={closeNotification}>&times;</button>
                <h2>Confirmation</h2>
                <p>Please check the patient information again before submitting.</p>
                <div className="notification-buttons">
                    <button className="cancel-button" onClick={closeNotification}>Cancel</button>
                    <button className="add-button" onClick={closeNotification}>Add</button>
                </div>
            </div>
        )
    );
};

export default Notification;
