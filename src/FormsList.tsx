import React, { useRef } from 'react'

const Form = (props:any) => {
    return <div className="form-box">
        <p><strong>Nagłówek</strong> <span id={`form${props.i}title`} className="textarea" role="textbox" contentEditable>{props.title}</span></p>
        <p><strong>Tekst</strong> <span id={`form${props.i}text`} className="textarea" role="textbox" contentEditable>{props.text}</span></p>
        <p><strong>Zdjęcie</strong> <span id={`form${props.i}image`} className="textarea" role="textbox" contentEditable>{props.image}</span></p>
    </div>
}

export const FormsList = (props : {slides:slide[],update:(slides:slide[])=>void}) => {
    function extractClasses():slide[]{
        //@ts-ignore
        return props.slides.map((s,i)=>new Object({
            title:document.getElementById(`form${i}title`)?.innerText,
            text:document.getElementById(`form${i}text`)?.innerText,
            image:document.getElementById(`form${i}image`)?.innerText
        }))
    }
    function newClass(){
        const updatedClasses:slide[]=extractClasses();
        console.log(updatedClasses);
        props.update([...updatedClasses,{title:"",text:"",image:""}])
    }
    return (
        <div className="main-content">
            {props.slides.map((slide,i)=>{
                return   <Form key={i} i={i} title={slide.title} text={slide.text} image={slide.image} />
            })}
          <div className="add-btn-container" onClick={newClass}>
            <button className="add-btn">Dodaj</button>
          </div>
        </div>
    )
}

