// App.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import { fetchNotifications } from './redux/notificationSlice';
import { fetchCourses } from './redux/courseSlice';

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchCourses());
  }, [isLoggedIn, dispatch]);

  return isLoggedIn ? <CourseList /> : <Login />;
}
