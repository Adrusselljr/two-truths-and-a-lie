import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Results(props) {
    return (
        <div className='App'>

            <h1>Results :</h1><br/>

            <p>UserName : {props.fetchedUserNameProp}</p>
            <p>Prompt 1 : {props.fetchedPromptOneProp}</p>
            <p>Prompt 2 : {props.fetchedPromptTwoProp}</p>
            <p>Prompt 3 : {props.fetchedPromptThreeProp}</p>
            <p>Vote 1 : {props.fetchedVoteOneProp}</p>
            <p>Vote 2 : {props.fetchedVoteTwoProp}</p>
            <p>Vote 3 : {props.fetchedVoteThreeProp}</p>
            <p>----------------------------------------------</p>

            <button onClick={props.getPromptPollProp} className="btn btn-primary">Get Poll</button>
        
        </div>
    )
}

export default Results
