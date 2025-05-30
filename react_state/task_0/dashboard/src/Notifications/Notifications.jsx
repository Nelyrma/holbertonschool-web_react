// task_0/dashboard/src/Notifications/Notifications.jsx
import React from "react";
import PropTypes from "prop-types";

class Notifications extends React.Component {
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
    const {
      displayDrawer,
      notifications,
      handleDisplayDrawer,
      handleHideDrawer,
    } = this.props;

    return (
      <>
        <div
          data-testid="menu-item"
          onClick={handleDisplayDrawer}
          style={{
            cursor: "pointer",
            position: "fixed",
            top: 0,
            right: 0,
            margin: "1rem",
          }}
        >
          Your notifications
        </div>

        {displayDrawer && (
          <div
            style={{
              border: "2px dashed red",
              padding: "10px",
              width: "400px",
              backgroundColor: "#fff8f8",
              position: "absolute",
              right: 0,
              top: "2.5rem",
              zIndex: 1,
            }}
            data-testid="notifications-panel"
          >
            {notifications.length > 0 ? (
              <>
                <p>Here is the list of notifications</p>
                <button
                  aria-label="Close"
                  onClick={() => {
                    console.log("Close button has been clicked");
                    handleHideDrawer();
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    zIndex: 1001,
                  }}
                >
                  Close
                </button>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      onClick={() => this.markAsRead(notification.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {notification.value ? (
                        notification.value
                      ) : (
                        <span dangerouslySetInnerHTML={notification.html} />
                      )}
                    </li>
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
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

export default Notifications;
