export function getCurrentYear() {
  return new Date().getFullYear();
}
// داخل utils.js أو الملف الذي يحتوي الدالة
export function getFooterCopy(isIndex) {
  if (isIndex) {
    return "Holberton School";
  } else {
    return "Holberton School main dashboard"; // يجب أن تُرجع هذه القيمة عند `false`
  }
}

export function getLatestNotification() {
  return "<strong>Urgent requirement</strong> - complete by EOD";
}
