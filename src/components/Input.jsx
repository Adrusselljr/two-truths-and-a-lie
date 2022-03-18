import React from 'react'

function Input(props) {
    return (
        <div className="form-group">
            <label>{ props.promptsProp.name } : </label>
            <input className='form-control' type="text" name={ props.promptsProp.name } value={ props.promptsProp.input } onChange={ props.changeHandlerPromptsProp }/>
            <label className='form-check-label'>  isLie: </label>
            <input className='form-check-input' type="checkbox" name={ props.promptsProp.name } checked={ props.promptsProp.isLie } onChange={ props.changeHandlerCheckboxProps }/>
            <p>----------------------------------------------</p>
        </div>
    )
}

export default Input