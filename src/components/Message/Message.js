import React, { Component } from 'react'
import Dialog from '../Dialog'
export class Message extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isShow:false,
             content:'from message'
        }
    }
    updateState(options){
        console.log(this.state)
        console.log(options)
        this.setState(Object.assign(this.state,options))
    }
    render() {
        return (
            <Dialog>
                <div>{this.state.content}</div>
            </Dialog>
        )
    }
}

export default Message
