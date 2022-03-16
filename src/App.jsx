import React, { Component } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'

export class App extends Component {

    state = {
        userName: "",
        vote: 1,
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
        })
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
        )
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
        )
    }

    changeHandlerVote = e => {
        this.setState({
                vote: e.target.value,
        })
    }

    getPromptPoll = async() => {
        const currentPoll = await clickHandlerPoll()
        const parsedPollData = JSON.parse(currentPoll)
        console.log("parsedPollData ", parsedPollData)
        console.log(parsedPollData.promptVotes)
        
        this.setState({
            fetchedUserName: parsedPollData.currentPrompt.userName,
            fetchedPromptOne: parsedPollData.currentPrompt.prompts.promptOne.prompt,
            fetchedPromptTwo: parsedPollData.currentPrompt.prompts.promptTwo.prompt,
            fetchedPromptThree: parsedPollData.currentPrompt.prompts.promptThree.prompt
        })
    }

    clickHandlerPrompt = async() => {
        const { userName, promptObj: { promptOne, promptTwo, promptThree } } = this.state

        const newBody = {
            userName: userName,
            prompts: {
                promptOne: {
                    prompt: promptOne.input,
                    isLie: promptOne.isLie
                },
                promptTwo: {
                    prompt: promptTwo.input,
                    isLie: promptTwo.isLie
                },
                promptThree: {
                    prompt: promptThree.input,
                    isLie: promptThree.isLie
                }
            }
        }

        const serverURL = "http://ce44-108-53-232-66.ngrok.io"
        const response = await fetch(`${serverURL}/prompt-submit`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "access-control-request-headers": "content-type",
                "x-Trigger": "CORS",
            },
            body: JSON.stringify(
                newBody
            )
        })
        const promptResponse = await response.text()
        console.log(promptResponse)
        return promptResponse
    }

    clickHandlerVote = async() => {
        const { userName, vote } = this.state

        const newBody = {
            userName: userName,
            promptVote: Number(vote)
        }

        const serverURL = "http://ce44-108-53-232-66.ngrok.io"
        const response = await fetch(`${serverURL}/prompt-vote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "access-control-request-headers": "content-type",
                "x-Trigger": "CORS",
            },
            body: JSON.stringify(
                newBody
            )
        })
        const voteResponse = await response.text()
        console.log(voteResponse)
        return voteResponse
    }

    clickHandlerPing = async(userName) => {
        const serverURL = "http://ce44-108-53-232-66.ngrok.io"
        const response = await fetch(`${serverURL}/ping`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "access-control-request-headers": "content-type",
                "x-Trigger": "CORS",
            },
            body: JSON.stringify({
                userName
            })
        })
        const pingResponse = await response.text()
        console.log(pingResponse)
        return pingResponse
    }

    render() {
        return (
            <div className='App'>

                <h1>Two Truths and a Lie</h1>

                <div className="form-group">
                    <label>Username : </label>
                    <input className='form-control' name="userName" value={ this.state.userName } onChange={ this.changeHandlerUserName }/>
                    <p>----------------------------------------------</p>
                </div>

                <div className="form-group">
                    <label>Prompt 1 : </label>
                    <input className='form-control' type="text" name="promptOne" value={ this.state.promptObj.promptOne.input } onChange={ this.changeHandlerPrompts }/>
                    <label className='form-check-label'>  isLie: </label>
                    <input className='form-check-input' type="checkbox" name="promptOne" checked={ this.state.promptObj.promptOne.isLie } onChange={ this.changeHandlerCheckbox }/>
                    <p>----------------------------------------------</p>
                </div>

                <div className="form-group">
                    <label>Prompt 2 : </label>
                    <input className='form-control' type="text" name="promptTwo" value={ this.state.promptObj.promptTwo.input } onChange={ this.changeHandlerPrompts }/>
                    <label className='form-check-label'>  isLie: </label>
                    <input className='form-check-input' type="checkbox" name="promptTwo" checked={ this.state.promptObj.promptTwo.isLie } onChange={ this.changeHandlerCheckbox }/>
                    <p>----------------------------------------------</p>
                </div>

                <div className="form-group">
                    <label>Prompt 3 : </label>
                    <input className='form-control' type="text" name="promptThree" value={ this.state.promptObj.promptThree.input } onChange={ this.changeHandlerPrompts }/>
                    <label className='form-check-label'>  isLie: </label>
                    <input className='form-check-input' type="checkbox" name="promptThree" checked={ this.state.promptObj.promptThree.isLie } onChange={ this.changeHandlerCheckbox }/>
                    <p>----------------------------------------------</p>
                </div>

                <div className="form-group">
                    <label>Vote : </label>
                    <input min={ 1 } max={ 3 } className='form-control vote' type="number" name="vote" value={ this.state.vote } onChange={ this.changeHandlerVote }/>
                    <p>----------------------------------------------</p>
                </div>

                <button onClick={this.clickHandlerPrompt} className="btn btn-primary">Send Prompt</button>
                <button onClick={this.clickHandlerVote} className="btn btn-primary">Send Vote</button>
                <button onClick={() => this.clickHandlerPing(this.state.userName)} className="btn btn-primary">Send Ping</button><br/><br/><br/><br/>

                <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                <br/><br/>

                
                <h1>Results :</h1><br/>

                <p>UserName : {this.state.fetchedUserName}</p>
                <p>Prompt 1 : {this.state.fetchedPromptOne}</p>
                <p>Prompt 2 : {this.state.fetchedPromptTwo}</p>
                <p>Prompt 3 : {this.state.fetchedPromptThree}</p>
                <p>Vote 1 : {this.state.fetchedVoteOne}</p>
                <p>Vote 2 : {this.state.fetchedVoteTwo}</p>
                <p>Vote 3 : {this.state.fetchedVoteThree}</p>

                <button onClick={this.getPromptPoll} className="btn btn-primary">Get Poll</button>

            </div>

        )
    }
}

const clickHandlerPoll = async() => {
    const serverURL = "http://ce44-108-53-232-66.ngrok.io"
    const response = await fetch(`${serverURL}/prompt-poll`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "access-control-request-headers": "content-type",
            "x-Trigger": "CORS",
        }
    })
    return await response.text()
}

export default App