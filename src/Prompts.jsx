import React, { Component } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Input from './components/Input'
import Results from './components/Results'

const serverURL = "http://ad4d-108-53-232-66.ngrok.io"

export class Prompts extends Component {

    state = {
        userName: "",
        vote: 1,
        prompts: [
            {
                name: "promptOne",
                input: "",
                isLie: false,
            },
            {
                name: "promptTwo",
                input: "",
                isLie: false,
            },
            {
                name: "promptThree",
                input: "",
                isLie: false,
            }
        ],
        fetchedUserName: "",
        fetchedPromptOne: "",
        fetchedPromptTwo: "",
        fetchedPromptThree: "",
        fetchedVoteOne: "",
        fetchedVoteTwo: "",
        fetchedVoteThree: ""
    }

    changeHandlerUserName = e => {
        this.setState({
            userName: e.target.value
        })
    }

    changeHandlerPrompts = e => {
        let updatedPrompts = [
            ...this.state.prompts
        ]

        updatedPrompts = updatedPrompts.map(elm => {
            if(elm.name === e.target.name) {
                return {
                    ...elm,
                    input: e.target.value
                }
            }
            return {
                ...elm
            }
        })
        this.setState({
            prompts: updatedPrompts
        })
    }

    changeHandlerCheckbox = e => {
        let updatedPrompts = [
            ...this.state.prompts
        ]

        updatedPrompts = updatedPrompts.map(elm => {
            if(elm.name === e.target.name) {
                return {
                    ...elm,
                    isLie: e.target.checked
                }
            }
            return {
                ...elm
            }
        })
        this.setState({
            prompts: updatedPrompts
        })
    }

    changeHandlerVote = e => {
        this.setState({
                vote: e.target.value,
        })
    }

    clickHandlerPrompt = async() => {
        const { userName, prompts: [ promptOne, promptTwo, promptThree ] } = this.state

        const newBody = {
            userName: userName,
            prompts: {
                [promptOne.name]: {
                    prompt: promptOne.input,
                    isLie: promptOne.isLie
                },
                [promptTwo.name]: {
                    prompt: promptTwo.input,
                    isLie: promptTwo.isLie
                },
                [promptThree.name]: {
                    prompt: promptThree.input,
                    isLie: promptThree.isLie
                }
            }
        }

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

    getPromptPoll = async() => {
        const currentPoll = await clickHandlerPoll()
        const parsedPollData = JSON.parse(currentPoll)

        this.setState({
            fetchedUserName: parsedPollData.currentPrompt.userName,
            fetchedPromptOne: parsedPollData.currentPrompt.prompts.promptOne.prompt,
            fetchedPromptTwo: parsedPollData.currentPrompt.prompts.promptTwo.prompt,
            fetchedPromptThree: parsedPollData.currentPrompt.prompts.promptThree.prompt,
            fetchedVoteOne: parsedPollData.promptVotes[1],
            fetchedVoteTwo: parsedPollData.promptVotes[2],
            fetchedVoteThree: parsedPollData.promptVotes[3]
        })
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

                { this.state.prompts.map((elm, idx) => {
                    return <Input
                    key={idx}
                    promptsProp={elm}
                    changeHandlerPromptsProp={ this.changeHandlerPrompts }
                    changeHandlerCheckboxProps={ this.changeHandlerCheckbox }
                    />
                }) }

                <div className="form-group">
                    <label>Vote : </label>
                    <input min={ 1 } max={ 3 } className='form-control vote' type="number" name="vote" value={ this.state.vote } onChange={ this.changeHandlerVote }/>
                    <p>----------------------------------------------</p>
                </div>

                
                <button onClick={ this.clickHandlerPrompt } className="btn btn-primary">Send Prompt</button>
                <button onClick={ this.clickHandlerVote } className="btn btn-primary">Send Vote</button>
                <button onClick={ () => this.clickHandlerPing(this.state.userName) } className="btn btn-primary">Send Ping</button><br/><br/><br/><br/>

                <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                <br/><br/>

                <Results
                getPromptPollProp={ this.getPromptPoll }
                fetchedUserNameProp={ this.state.fetchedUserName }
                fetchedPromptOneProp={ this.state.fetchedPromptOne }
                fetchedPromptTwoProp={ this.state.fetchedPromptTwo }
                fetchedPromptThreeProp={ this.state.fetchedPromptThree }
                fetchedVoteOneProp={ this.state.fetchedVoteOne }
                fetchedVoteTwoProp={ this.state.fetchedVoteTwo }
                fetchedVoteThreeProp={ this.state.fetchedVoteThree }
                />

            </div>
        )
    }
}

export default Prompts

const clickHandlerPoll = async() => {
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