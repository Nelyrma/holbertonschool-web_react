import { memo } from 'react';

const NotificationItem = memo(function NotificationItem({
  type,
  html,
  value,
  markAsRead,
  id,
}) {
  console.log(`Rendering NotificationItem with id: ${id}, type: ${type}, value: ${value}`);

  const handleClick = () => markAsRead(id);

  if (type === 'urgent' && html !== undefined) {
    return (
      <li
        style={{ color: 'red', cursor: 'pointer' }}
        data-notification-type={type}
        onClick={handleClick}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li
      style={{ color: type === 'urgent' ? 'red' : 'blue', cursor: 'pointer' }}
      data-notification-type={type}
      onClick={handleClick}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
