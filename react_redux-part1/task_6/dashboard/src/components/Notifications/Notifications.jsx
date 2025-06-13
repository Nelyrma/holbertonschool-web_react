import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import {
  showDrawer,
  hideDrawer,
  markAsRead,
} from '../../redux/notifications/notificationSlice';

const styles = StyleSheet.create({
  notificationTitle: {
    float: 'right',
    position: 'absolute',
    right: '10px',
    top: '2px',
    cursor: 'pointer',
  },
  notifications: {
    border: 'dotted',
    borderColor: 'crimson',
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

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const displayDrawer = useSelector((state) => state.notifications.displayDrawer);
  const notifications = useSelector((state) => state.notifications.notifications);

  return (
    <>
      <div
        className={css(styles.notificationTitle)}
        onClick={() => dispatch(showDrawer())}
      >
        Your notifications
      </div>
      {displayDrawer && (
        <div className={css(styles.notifications)}>
          {notifications.length > 0 ? (
            <>
              <p>Here is the list of notifications</p>
              <button
                onClick={() => dispatch(hideDrawer())}
                aria-label="Close"
                className={css(styles.notificationsButton)}
              >
                <img src={closeIcon} alt="close icon" />
              </button>
              <ul>
                {notifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    id={notif.id}
                    type={notif.type}
                    value={notif.value}
                    html={notif.html}
                    markAsRead={() => dispatch(markAsRead(notif.id))}
                    className={
                      notif.type === 'urgent'
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
    </>
  );
});

export default Notifications;
