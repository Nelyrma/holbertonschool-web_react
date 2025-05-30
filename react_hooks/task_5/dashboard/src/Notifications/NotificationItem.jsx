import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const NotificationItem = ({ type, html, value, id, markAsRead }) => {
  const styleClass = css(
    type === "urgent" ? styles.urgent : styles.default,
    styles.responsive
  );

  const handleClick = () => markAsRead(id);

  if (html) {
    return (
      <li
        data-notification-type={type}
        className={styleClass}
        dangerouslySetInnerHTML={html}
        onClick={handleClick}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      className={styleClass}
      onClick={handleClick}
    >
      {value}
    </li>
  );
};

// Performance optimization (memoization)
export default React.memo(NotificationItem);

const styles = StyleSheet.create({
  default: {
    color: "blue",
  },
  urgent: {
    color: "red",
  },
  responsive: {
    "@media (max-width: 900px)": {
      width: "100%",
      borderBottom: "1px solid black",
      fontSize: "20px",
      padding: "10px 8px",
    },
  },
});

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  id: PropTypes.number,
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: "default",
  markAsRead: () => {},
};
