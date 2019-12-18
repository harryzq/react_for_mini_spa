import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import __Message from './Message'
function createMessage() {
    const div= document.createElement('div')
    document.body.appendChild(div)
    const _Message = ReactDOM.render(React.createElement(__Message),div)
    return{
      addMessage(options){
        return _Message.updateState(options)
      },
      destory(){
        ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
      }
    }
}
let _Message
const Message = (...options)=>{
  if(!_Message) _Message = createMessage()
  return _Message.addMessage(...options)
}

export default Message