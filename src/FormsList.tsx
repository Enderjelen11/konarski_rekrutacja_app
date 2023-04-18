import React from 'react'

export const FormsList = (props : {}) => {
    return (
        <div className="main-content">
          <div className="form-box">
            <p><strong>Title</strong> <span className="textarea" role="textbox" contentEditable></span></p>
            <p><strong>Text</strong> <span className="textarea" role="textbox" contentEditable></span></p>
            <p><strong>Image</strong> <span className="textarea" role="textbox" contentEditable></span></p>
          </div>
        </div>
    )
}
