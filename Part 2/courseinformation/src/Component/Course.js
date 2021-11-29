import React from 'react'

const Course=({course})=>{
    return(
        <div>
            <h2>{course.name}</h2> 
            {course.parts.map(part=>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}   
            <b>
                total of {course.parts.reduce( (total, part) => total + part.exercises, 0)} exercises
            </b>
        </div>
    )
}

export default Course