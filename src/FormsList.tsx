import React, { useEffect } from 'react'

const Form = (props:any) => {
    return <div className="form-box" style={{backgroundColor:"#f0f0f0"}}>
        <p><strong>Nagłówek</strong> <span id={`form${props.i}title`} className="textarea" role="textbox" contentEditable>{props.title}</span></p>
        <p><strong>Tekst</strong> <span id={`form${props.i}text`} className="textarea" role="textbox" contentEditable>{props.text}</span></p>
        <p><strong>Zdjęcie</strong> <span id={`form${props.i}image`} className="textarea" role="textbox" contentEditable>{props.image}</span></p>
    </div>
}

const TitleSlide = (props:any) => {
    return <div className="form-box" style={{backgroundColor:"#b0b0b0"}}>
        <p><strong>Nazwa Profilu</strong> <span id={`form${props.i}title`} className="textarea" role="textbox" contentEditable>{props.title}</span></p>
        <p><strong>Tekst</strong> <span id={`form${props.i}text`} className="textarea" role="textbox" contentEditable>{props.text}</span></p>
        <p><strong>Zdjęcie</strong> <span id={`form${props.i}image`} className="textarea" role="textbox" contentEditable>{props.image}</span></p>
    </div>
}

export const FormsList = (props : {slides:slide[],classIndex:number, addFunc:(newEl:slide)=>void}) => {
    return (
        <div className="main-content">
            {props.slides.map((slide,i)=>{
                if (i==0) {
                    return   <TitleSlide key={i} i={i} title={slide.title} text={slide.text} image={slide.image}/>
                }else{
                    return   <Form key={i} i={i} title={slide.title} text={slide.text} image={slide.image}/>
                }
            })}
          <div className="add-btn-container">
            <button className="add-btn" onClick={()=>{props.addFunc({title:"",text:"",image:"",cIndx:props.slides.length})}}>Dodaj</button>
          </div>
        </div>
    )
}

