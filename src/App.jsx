import React, { Component } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Form from './components/Form'
import List from './components/List'
import { loadCourses, saveCourses, createId } from './storage'

import './style/app.css'

export default class App extends Component {
  state = {
    courses: loadCourses(),
    current: '',
  }

  updateCourse = (e) => {
    // console.log(e.target.value);
    this.setState({
      current: e.target.value
    })
  }

  // Persist after React has applied the update; saving right after
  // setState() wrote the previous (stale) this.state.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.courses !== this.state.courses) {
      saveCourses(this.state.courses)
    }
  }

  addCourse = (e) => {
    e.preventDefault();
    // console.log("ADDED");
    let current = this.state.current.trim()

    if (current === '') {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <strong> How could you want to study Nothing? </strong>,
        html: <i>Please Enter Valid Course!</i>,
        icon: 'error'
      })
    } else {
      this.setState(prevState => ({
        courses: [...prevState.courses, { id: createId(), name: current }]
      }))
    }
    this.setState({
      current: ''
    })

  }

  deleteCourse = (id) => {
    this.setState(prevState => ({
      courses: prevState.courses.filter(course => course.id !== id)
    }))

  }

  editCourse = (id, newValue) => {
    this.setState(prevState => ({
      courses: prevState.courses.map(course =>
        course.id === id ? { ...course, name: newValue } : course
      )
    }))

  }


  render() {
    const { courses } = this.state;

    let renderCourses = courses.map((course) => {
      return (
        <List key={course.id} course={course} deleteCourse={this.deleteCourse} editCourse={this.editCourse} />
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
