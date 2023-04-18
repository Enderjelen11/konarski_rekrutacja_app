import React from 'react'

const Form = (props:slide) => {
    return <div className="form-box">
        <p><strong>Nagłówek</strong> <span className="textarea" role="textbox" contentEditable>{props.title}</span></p>
        <p><strong>Tekst</strong> <span className="textarea" role="textbox" contentEditable>{props.text}</span></p>
        <p><strong>Zdjęcie</strong> <span className="textarea" role="textbox" contentEditable>{props.image}</span></p>
    </div>
}

export const FormsList = (props : {slides:slide[]}) => {
    return (
        <div className="main-content">
            {props.slides.map((slide,i)=>{
                return   <Form key={i} title={slide.title} text={slide.text} image={slide.image} />
            })}
          <div className="add-btn-container">
            <button className="add-btn">Dodaj</button>
          </div>
        </div>
    )
}

