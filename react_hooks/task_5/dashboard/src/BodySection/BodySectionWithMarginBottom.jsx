import React, { Component } from "react";
import BodySection from "./BodySection";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

class BodySectionWithMarginBottom extends Component {
  render() {
    return (
      <div className={css(styles.marginBottom)}>
        <BodySection {...this.props} />
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = BodySection.propTypes;

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: "40px",
  },
});

export default BodySectionWithMarginBottom;
