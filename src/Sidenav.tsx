import React from 'react'
import './style.css'

export default function Sidenav(props:{classes:{name:string}[]}) {
  return (
    <div className="sidenav">
      <div className="add-btn-container">
        <button className="add-btn">Add</button>
      </div>
      <div className="class-profiles">
        {[...props.classes.map((profile,i)=>{
             return <a href="#" key={`el ${i}`}>{profile.name}</a>
        })]}
      </div>
    </div>
  )
}
