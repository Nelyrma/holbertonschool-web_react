import { memo } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  markNotificationAsRead,
  showNotificationDrawer,
  hideNotificationDrawer,
} from '../../redux/notifications/notificationsSlice';

const styles = StyleSheet.create({
  notificationTitle: {
    position: 'absolute',
    right: '10px',
    top: '2px',
    cursor: 'pointer',
  },
  notifications: {
    border: '1px dotted crimson',
    marginTop: '1%',
    paddingLeft: '1rem',
    marginBottom: '1rem',
    width: '40%',
    marginLeft: '59%',
  },
  notificationsButton: {
    position: 'absolute',
    cursor: 'pointer',
    right: '5px',
    top: '20px',
    background: 'transparent',
    border: 'none',
  },
  notificationTypeDefault: {
    color: 'blue',
  },
  notificationTypeUrgent: {
    color: 'red',
  },
  menuItem: {
    textAlign: 'right',
  },
});

const Notifications = memo(() => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items || []);
  const displayDrawer = useSelector((state) => state.notifications.displayDrawer);

  const handleDisplayDrawer = () => {
    dispatch(showNotificationDrawer());
  };

  const handleHideDrawer = () => {
    dispatch(hideNotificationDrawer());
  };

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  return (
    <div>
      <div className={css(styles.notificationTitle)} onClick={handleDisplayDrawer}>
        Your notifications
      </div>
      {displayDrawer && (
        <div className={css(styles.notifications)}>
          {notifications.length > 0 ? (
            <>
              <p>Here is the list of notifications</p>
              <button
                onClick={handleHideDrawer}
                aria-label="Close"
                className={css(styles.notificationsButton)}
              >
                <img src={closeIcon} alt="close icon" />
              </button>
              <ul>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={() => handleMarkAsRead(notification.id)}
                    className={
                      notification.type === 'urgent'
                        ? css(styles.notificationTypeUrgent)
                        : css(styles.notificationTypeDefault)
                    }
                  />
                ))}
              </ul>
            </>
          ) : (
            <p>No new notifications for now</p>
          )}
        </div>
      )}
    </div>
  );
});

export default Notifications;
