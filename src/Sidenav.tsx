import React from 'react'
import './style.css'

export default function Sidenav(props:{classes:slide[][],newClass:()=>void,selectClass:any,saveFunc:(addElement:slide[])=>void}) {
  return (
    <div className="sidenav">
      <div className="add-btn-container" onClick={()=>{props.newClass()}}>
        <button className="add-btn">Dodaj</button>
      </div>
      <div className="class-profiles">
        {[...props.classes.map((profile,i)=>{
             //crap solution but works
             return <a href="#" onClick={()=>{props.saveFunc([]);setTimeout(()=>{props.selectClass(i)},50)}} key={`el ${i}`}>{profile[0].title}</a>
        })]}
      </div>
    </div>
  )
}
