import React, { Component } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Form from './components/Form'
import List from './components/List'

import './style/app.css'

export default class App extends Component {
  state = {
    courses: JSON.parse(localStorage.getItem('savedCourses')) ? JSON.parse(localStorage.getItem('savedCourses')) : [],
    current: '',
  }

  updateCourse = (e) => {
    // console.log(e.target.value);
    this.setState({
      current: e.target.value
    })
    localStorage.setItem('savedCourses', JSON.stringify(this.state.courses))

  }

  addCourse = (e) => {
    e.preventDefault();
    // console.log("ADDED");
    let current = this.state.current
    let courses = this.state.courses

    if (current === '') {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <strong> How could you want to study Nothing? </strong>,
        html: <i>Please Enter Valid Course!</i>,
        icon: 'error'
      })
    } else {
      courses.push({ name: current })
    }
    this.setState({
      // courses : courses
      courses,
      current: ''
    })
    localStorage.setItem('savedCourses', JSON.stringify(this.state.courses))

  }

  deleteCourse = (index) => {
    let courses = this.state.courses
    courses.splice(index, 1)
    this.setState({
      courses
    })
    localStorage.setItem('savedCourses', JSON.stringify(this.state.courses))

  }

  editCourse = (index, newValue) => {
    let courses = this.state.courses
    let course = courses[index]
    course.name = newValue

    this.setState({
      courses
    })
    localStorage.setItem('savedCourses', JSON.stringify(this.state.courses))

  }


  render() {
    const { courses } = this.state;

    let renderCourses = courses.map((course, index) => {
      return (
        <List key={index} index={index} course={course} deleteCourse={this.deleteCourse} editCourse={this.editCourse} />
      )
    })
    return (
      <section className="App" >
        <h1>
          👨🏽‍💻 Courses To Study
        </h1>

        <div className="addForm">
          <Form current={this.state.current} updateCourse={this.updateCourse} addCourse={this.addCourse} />
        </div>

        <ul>
          {renderCourses}
        </ul>

      </section>
    )

  }
}
