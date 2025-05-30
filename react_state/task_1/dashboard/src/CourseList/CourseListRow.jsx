import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";

const CourseListRow = ({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) => {
  const rowStyle = isHeader ? styles.headerRow : styles.defaultRow;

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={css(rowStyle)}>
          <th className={css(styles.th)} colSpan="2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className={css(rowStyle)}>
        <th className={css(styles.th)}>{textFirstCell}</th>
        <th className={css(styles.th)}>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr className={css(rowStyle)}>
      <td className={css(styles.td)}>{textFirstCell}</td>
      <td className={css(styles.td)}>{textSecondCell}</td>
    </tr>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: "#deb5b545",
  },
  defaultRow: {
    backgroundColor: "#f5f5f5ab",
  },
  th: {
    textAlign: "left",
    padding: "10px",
  },
  td: {
    padding: "10px",
  },
});

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.string,
};

export default CourseListRow;
