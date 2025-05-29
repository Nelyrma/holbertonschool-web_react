import React from 'react';
import CourseListRow from './CourseListRow';
import './CourseList.css';

class CourseList extends React.Component {
  static defaultProps = {
    courses: [],
  };

  render() {
    const { courses } = this.props;

    return (
      <table id="CourseList">
        {courses.length > 0 ? (
          <>
            <thead>
              <CourseListRow isHeader={true} textFirstCell="Available courses" />
              <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
            </thead>
            <tbody>
              {courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                />
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <CourseListRow isHeader={true} textFirstCell="No course available yet" />
          </tbody>
        )}
      </table>
    );
  }
}

export default CourseList;
