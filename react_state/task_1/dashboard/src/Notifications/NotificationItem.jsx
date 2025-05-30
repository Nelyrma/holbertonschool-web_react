import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends React.PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const style = type === 'urgent' ? styles.urgent : styles.default;

    return html ? (
      <li
        className={css(style)}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      ></li>
    ) : (
      <li
        className={css(style)}
        data-notification-type={type}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

const baseStyle = {
  padding: '5px',
  '@media (max-width: 900px)': {
    width: '100vw',
    fontSize: '20px',
    borderBottom: '1px solid black',
    padding: '10px 8px',
  },
};

const styles = StyleSheet.create({
  default: {
    ...baseStyle,
    color: 'blue',
  },
  urgent: {
    ...baseStyle,
    color: 'red',
  },
});

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number.isRequired,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
};

export default NotificationItem;
