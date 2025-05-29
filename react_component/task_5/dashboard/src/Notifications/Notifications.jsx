import React from 'react';
import './Notifications.css';
import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length !== this.props.notifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { notifications, displayDrawer } = this.props;

    return (
      <>
        <div className='notifications-title'>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className="notifications">
            {notifications.length > 0 ? (
              <>
                <p>Here is the list of notifications</p>
                <button
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => console.log('Close button has been clicked')}
                  aria-label="Close"
                >
                  <img src={closebtn} alt="Close" />
                </button>
                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <p>No new notification for now</p>
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
};

Notifications.defaultProps = {
  displayDrawer: true,
  notifications: [],
};

export default Notifications;
