import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

export default function Footer() {
  return (
    <div className={css(styles.footer)}>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </div>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    fontStyle: 'italic',
    borderTop: '3px solid #e11d3f',
    padding: '1rem 0',
  },
});
