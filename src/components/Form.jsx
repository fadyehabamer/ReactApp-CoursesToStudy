import React from 'react'



export default function Form(props) {
  return (
    <div>
      <form onSubmit={props.addCourse}>
        <input placeholder='Course To Finish' value={props.current} type="text" onChange={props.updateCourse} />
        <button className='addBtn' type="submit"  >Add Course </button>
      </form>
    </div>
  )
}
