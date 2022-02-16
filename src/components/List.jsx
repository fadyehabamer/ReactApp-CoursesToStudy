import React, { Component, Fragment } from 'react'

export default class List extends Component {

    state = {
        isEdit: false,

    }

    renderCourses = () => {
        return (
            <li>
                <span className='todo'>
                    {this.props.course.name}
                </span>
                <div className='options'>

                    <span>
                        <button className='edit' onClick={() => { this.toggleState() }}> EDIT  </button>
                    </span>
                    <span>
                        <button className='delete' onClick={() => this.props.deleteCourse(this.props.index)}> DELETE </button>
                    </span>
                </div>

            </li>
        )
    }

    toggleState = () => {
        let { isEdit } = this.state
        this.setState({
            isEdit: !isEdit
        })
        // console.log(this.state.isEdit);
    }

    updateCourse = (e) => {
        e.preventDefault();
        this.props.editCourse(this.props.index, this.newInput.value)
        this.toggleState()
    }

    updateForm = () => {
        return (
            <form onSubmit={this.updateCourse}>
                <input type="text" ref={(v) => this.newInput = v} defaultValue={this.props.course.name} />
                <input type="submit" value="update" />
            </form>
        )
    }

    render() {

        return (
            <Fragment>
                {this.state.isEdit ? this.updateForm() : this.renderCourses()}
            </Fragment>
        )
    }
}