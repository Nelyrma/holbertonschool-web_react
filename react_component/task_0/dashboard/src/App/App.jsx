import React from 'react';
import './App.css';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import PropTypes from 'prop-types';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // 1. Default prop logOut (obligatoire)
  static defaultProps = {
    logOut: () => {}
  };

  // 2. Lifecycle method: ajouter event listener
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  // 3. Supprimer le listener à l'unmount
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // 4. Gestion du raccourci Ctrl + h
  handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  render() {
    const isLoggedIn = false;

    const notificationsList = [
      { id: 1, type: 'urgent', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <>
        <div className='root-notifications'>
          <Notifications notifications={notificationsList} />
        </div>
        <Header />
        {isLoggedIn ? <CourseList courses={coursesList} /> : <Login />}
        <Footer />
      </>
    );
  }
}

export default App;

App.propTypes = {
  logOut: PropTypes.func,
};
