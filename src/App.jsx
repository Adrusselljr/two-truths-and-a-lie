import React, { Component } from 'react'
import "./App.css"

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

                    <label>Username: </label>
                    <input name="userName" value={ this.state.userName } onChange={ this.changeHandlerUserName }/><br/>

                    <label>Prompt 1: </label>
                    <input type="text" name="promptOne" value={ this.state.promptObj.promptOne.input } onChange={ this.changeHandlerPrompts }/>
                    <label>  isLie: </label>
                    <input type="checkbox" name="promptOne" checked={ this.state.promptObj.promptOne.isLie } onChange={ this.changeHandlerCheckbox }/><br/>

                    <label>Prompt 2: </label>
                    <input type="text" name="promptTwo" value={ this.state.promptObj.promptTwo.input } onChange={ this.changeHandlerPrompts }/>
                    <label>  isLie: </label>
                    <input type="checkbox" name="promptTwo" checked={ this.state.promptObj.promptTwo.isLie } onChange={ this.changeHandlerCheckbox }/><br/>

                    <label>Prompt 3: </label>
                    <input type="text" name="promptThree" value={ this.state.promptObj.promptThree.input } onChange={ this.changeHandlerPrompts }/>
                    <label>  isLie: </label>
                    <input type="checkbox" name="promptThree" checked={ this.state.promptObj.promptThree.isLie } onChange={ this.changeHandlerCheckbox }/><br/>

                    <label>Vote: </label>
                    <input type="number" name="vote" value={ this.state.vote } onChange={ this.chsangeHandlerVote }/><br/>

                    <button>Send Prompt</button>
                    <button>Send Vote</button>

                </form>

            </div>
        )
    }
}

export default App