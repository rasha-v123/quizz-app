import React, {useEffect, useState} from "react"
import SingleQuestion from "./SingleQuestion"

export default function Questions() {
    
    const [questions, setQuestions] = useState([])
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then((response) => response.json())
            .then(data => {
                setQuestions(data.results)
                 
                // setQuestionsAndAnswers(data.results.map((questionObject) => (
                    
                // )))
            
               setQuestionsAndAnswers(
                    data.results.map((questionObject) => {
                        return {
                            question: questionObject.question,
                            shuffledAnswers: shuffle([
                                ...questionObject.incorrect_answers,
                                questionObject.correct_answer
                            ]),
                            correctAnswer: questionObject.correct_answer,
                            selectedAnswer: "",  
                        }
                    })
                    ) 
                })
            }, [])
            
            function shuffle(array) {
                let currentIndex = array.length,
                randomIndex;
                
                while (currentIndex != 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    
                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex],
                        array[currentIndex]
                    ]
                }
                return array;
            }
            
            console.log(questionsAndAnswers)

            return(
        <>
            <h1>This is the questions page!</h1>
            <div className="questions-container">
                {
                    questionsAndAnswers.map((questionObject, index) => (
                        <SingleQuestion key={index} 
                            question={questionObject.question} 
                            allAnswers={questionObject.shuffledAnswers}
                        
                        />
                    ))
                }
            </div>
        </>
    )
}