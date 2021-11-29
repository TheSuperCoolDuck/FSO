import React from 'react'

const Course=({course})=>{
    return(
        <div>
            <h1>{course.name}</h1> 
            {course.parts.map(part=>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}   
            <b>
                total of {course.parts.reduce( (total, part) => {
                    return total + part.exercises
                }, 0)} exercises
            </b>
        </div>
    )
}

export default Course