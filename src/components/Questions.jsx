import React, {useEffect, useState} from "react"

export default function Questions() {
    
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then((response) => response.json())
            .then(data => {
                setQuestions(data.results)
            })
        }, [])
        
        // console.log(questions)
    return(
        <>
            <h1>This is the questions page!</h1>
            <div>
                {questions.map((question, index) => (
                    <div key={index}>
                        <span>Type: {question.question}</span>
                        <p>Choose between:</p>
                        <p>{question.map((q,index) => 
                            {q.incorrect_answer}
                        )}</p>
                    </div>
                ))}
            </div>
        </>
    )
}