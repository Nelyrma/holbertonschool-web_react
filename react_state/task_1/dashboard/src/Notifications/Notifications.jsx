import React from 'react';
import { StyleSheet, css } from 'aphrodite';
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

  handleMarkAsRead = (id) => () => {
    this.markAsRead(id);
  };

  render() {
    const {
      notifications,
      displayDrawer,
      handleDisplayDrawer,
      handleHideDrawer,
    } = this.props;

    return (
      <>
        {!displayDrawer && (
          <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
            <p className={css(styles.menuText)}>Your notifications</p>
          </div>
        )}

        {displayDrawer && (
          <div className={css(styles.panel)}>
            <button
              className={css(styles.closeBtn)}
              onClick={handleHideDrawer}
              aria-label="Close"
            >
              <img
                src={closebtn}
                alt="Close"
                className={css(styles.closeIcon)}
              />
            </button>

            {notifications.length > 0 ? (
              <>
                <p className={css(styles.panelText)}>Here is the list of notifications</p>
                <ul className={css(styles.ul)}>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.handleMarkAsRead(notification.id)}
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

const fade = {
  from: { opacity: 0.5 },
  to: { opacity: 1 },
};

const bounce = {
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' },
};

const styles = StyleSheet.create({
  '@keyframes fade': fade,
  '@keyframes bounce': bounce,

  menuItem: {
    position: 'fixed',
    top: 0,
    right: 0,
    backgroundColor: '#fff8f8',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 1000,
    ':hover': {
      animationName: ['fade', 'bounce'],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
    },
  },
  menuText: {
    margin: 0,
  },
  panel: {
    border: '2px dashed red',
    padding: '10px',
    width: '400px',
    backgroundColor: '#fff8f8',
    position: 'absolute',
    right: 0,
    top: '2.5rem',
    zIndex: 1001,
    '@media (max-width: 900px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      fontSize: '20px',
      padding: '20px',
      border: 'none',
    },
  },
  panelText: {
    fontSize: '16px',
    '@media (max-width: 900px)': {
      fontSize: '20px',
      margin: '10px',
    },
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    zIndex: 1002,
  },
  closeIcon: {
    width: '10px',
    height: '10px',
  },
});

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
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: true,
  notifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

export default Notifications;
