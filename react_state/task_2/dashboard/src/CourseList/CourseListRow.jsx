import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
  const rowClass = isHeader ? css(styles.headerRow) : css(styles.row);

  return (
    <tr className={rowClass}>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan="2" className={css(styles.headerCell)}>{textFirstCell}</th>
        ) : (
          <>
            <th className={css(styles.headerCell, styles.thLeft)}>{textFirstCell}</th>
            <th className={css(styles.headerCell)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "rgba(245, 245, 245, 0.67)"
  },
  headerRow: {
    backgroundColor: "rgba(222, 181, 181, 0.27)"
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "1px solid #ccc"
  },
  thLeft: {
    width: "70%"
  }
});
