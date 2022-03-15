import React, { Component } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'

export class App extends Component {

    state = {
        userName: "",
        vote: 0,
        promptObj: {
            promptOne: {
                input: "",
                isLie: false,
            },
            promptTwo: {
                input: "",
                isLie: false,
            },
            promptThree: {
                input: "",
                isLie: false,
            }
        }
    }

    changeHandlerUserName = e => {
        this.setState({
            userName: e.target.value
        }, () => console.log(this.state))
    }

    changeHandlerPrompts = e => {
        let newObj = {
            ...this.state,
            promptObj: {
                ...this.state.promptObj,
                [e.target.name]: {
                    ...this.state.promptObj[e.target.name],
                    input: e.target.value
                }
            }
        }
        this.setState(
            newObj
        ,() => console.log(this.state))
    }

    changeHandlerCheckbox = e => {
        let newObj = {
            ...this.state,
            promptObj: {
                ...this.state.promptObj,
                [e.target.name]: {
                    ...this.state.promptObj[e.target.name],
                    isLie: e.target.checked
                }
            }
        }
        this.setState(
            newObj
            ,() => console.log(this.state)
        )
    }

    chsangeHandlerVote = e => {
        this.setState({
            vote: e.target.value
        }, () => console.log(this.state))
    }

    render() {
        return (
            <div className='App'>

                <form>

                    <h1>Two Truths and a Lie</h1>

                    <div className="form-group">
                        <label>Username: </label>
                        <input className='form-control' name="userName" value={ this.state.userName } onChange={ this.changeHandlerUserName }/><br/>
                    </div>

                    <p>----------------------------------------------</p>

                    <div className="form-group">
                        <label>Prompt 1: </label>
                        <input className='form-control' type="text" name="promptOne" value={ this.state.promptObj.promptOne.input } onChange={ this.changeHandlerPrompts }/>
                        <label className='form-check-label'>  isLie: </label>
                        <input className='form-check-input' type="checkbox" name="promptOne" checked={ this.state.promptObj.promptOne.isLie } onChange={ this.changeHandlerCheckbox }/><br/>
                    </div>

                    <p>----------------------------------------------</p>

                    <div className="form-group">
                        <label>Prompt 2: </label>
                        <input className='form-control' type="text" name="promptTwo" value={ this.state.promptObj.promptTwo.input } onChange={ this.changeHandlerPrompts }/>
                        <label className='form-check-label'>  isLie: </label>
                        <input className='form-check-input' type="checkbox" name="promptTwo" checked={ this.state.promptObj.promptTwo.isLie } onChange={ this.changeHandlerCheckbox }/><br/>
                    </div>

                    <p>----------------------------------------------</p>

                    <div className="form-group">
                        <label>Prompt 3: </label>
                        <input className='form-control' type="text" name="promptThree" value={ this.state.promptObj.promptThree.input } onChange={ this.changeHandlerPrompts }/>
                        <label className='form-check-label'>  isLie: </label>
                        <input className='form-check-input' type="checkbox" name="promptThree" checked={ this.state.promptObj.promptThree.isLie } onChange={ this.changeHandlerCheckbox }/><br/>
                    </div>

                    <p>----------------------------------------------</p>

                    <div className="form-group">
                        <label>Vote: </label>
                        <input className='form-control' type="number" name="vote" value={ this.state.vote } onChange={ this.chsangeHandlerVote }/><br/>
                    </div>

                    <p>----------------------------------------------</p>

                    <button className="btn btn-primary">Send Prompt</button>
                    <button className="btn btn-primary">Send Vote</button>

                </form>

            </div>
        )
    }
}

export default App