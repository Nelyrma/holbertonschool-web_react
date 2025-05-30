import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={holbertonLogo} className={css(styles.logo)} alt="holberton logo" />
      <h1 className={css(styles.title)}>School dashboard</h1>
    </div>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '3px solid #e1003c',
    padding: '20px',
  },
  logo: {
    height: '150px',
    marginRight: '20px',
  },
  title: {
    color: '#e1003c',
    fontSize: '2rem',
  },
});
