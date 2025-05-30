import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite'; // ✅ Aphrodite
import BodySection from './BodySection';
import PropTypes from 'prop-types';

class BodySectionWithMarginBottom extends Component {
  render() {
    return (
      <div className={css(styles.marginBottom)}>
        <BodySection {...this.props} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: '40px',
  },
});

BodySectionWithMarginBottom.propTypes = BodySection.propTypes;

export default BodySectionWithMarginBottom;
