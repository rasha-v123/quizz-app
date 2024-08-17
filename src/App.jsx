import React from "react"
import OpenScreen from "./components/OpenScreen"
import {useState} from "react"
import Questions from "./components/Questions"

function App() {

  const [showQuestions, setShowQuestions] = useState(false)

  return (
    <div>
      {showQuestions ? <Questions/> : <OpenScreen setShowQuestions={setShowQuestions}/>} 
          
           {/* <h1>SEDDEMED</h1> */}
    </div>
  )
}

export default App
