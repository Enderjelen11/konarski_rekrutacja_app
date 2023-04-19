import React from 'react'
import './style.css'

export default function Sidenav(props:{classes:{title:string}[][]}) {
  return (
    <div className="sidenav">
      <div className="add-btn-container">
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
