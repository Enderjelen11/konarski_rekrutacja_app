import React, { useRef} from 'react'

const Form = (props:any) => {
    return <div className="form-box" style={{backgroundColor:"#f0f0f0"}}>
        <p><strong>Nagłówek</strong> <span id={`form${props.i}title${props.cIndx}`} className="textarea" role="textbox" contentEditable>{props.title}</span></p>
        <p><strong>Tekst</strong> <span id={`form${props.i}text${props.cIndx}`} className="textarea" role="textbox" contentEditable>{props.text}</span></p>
        <p><strong>Zdjęcie</strong> <span id={`form${props.i}image${props.cIndx}`} className="textarea" role="textbox" contentEditable>{props.image}</span></p>
    </div>
}

const TitleSlide = (props:any) => {
    return <div className="form-box" style={{backgroundColor:"#b0b0b0"}}>
        <p><strong>Nazwa Profilu</strong> <span id={`form${props.i}title${props.cIndx}`} className="textarea" role="textbox" contentEditable>{props.title}</span></p>
        <p><strong>Tekst</strong> <span id={`form${props.i}text${props.cIndx}`} className="textarea" role="textbox" contentEditable>{props.text}</span></p>
        <p><strong>Zdjęcie</strong> <span id={`form${props.i}image${props.cIndx}`} className="textarea" role="textbox" contentEditable>{props.image}</span></p>
    </div>
}

export const FormsList = (props : {slides:slide[],classIndex:number, saveFunc:(addElement:slide[])=>void}) => {
    return (
        <div className="main-content">
            {props.slides.map((slide,i)=>{
                if (i==0) {
                    return   <TitleSlide key={i} i={i} cIndx={slide.cIndx} title={slide.title} text={slide.text} image={slide.image}/>
                }else{
                    return   <Form key={i} i={i} cIndx={slide.cIndx} title={slide.title} text={slide.text} image={slide.image}/>
                }
            })}
          <div className="add-btn-container" onClick={()=>{props.saveFunc([{title:"",text:"",image:"",cIndx:props.classIndex}])}}>
            <button className="add-btn">Dodaj</button>
          </div>
        </div>
    )
}

