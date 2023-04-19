import React from 'react'
import './style.css'

export default function Sidenav(props:{classes:slide[][],newClass:()=>void}) {
  return (
    <div className="sidenav">
      <div className="add-btn-container" onClick={props.newClass}>
        <button className="add-btn">Dodaj</button>
      </div>
      <div className="class-profiles">
        {[...props.classes.map((profile,i)=>{
             return <a href="#" key={`el ${i}`}>{profile[0].title}</a>
        })]}
      </div>
    </div>
  )
}
