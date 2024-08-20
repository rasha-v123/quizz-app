import React, { useEffect, useState } from "react";
import SingleQuestion from "./SingleQuestion";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.results);

          // setQuestionsAndAnswers(data.results.map((questionObject) => (

          // )))

          setQuestionsAndAnswers(
            data.results.map((questionObject) => {
              return {
                question: questionObject.question,
                shuffledAnswers: shuffle([
                  ...questionObject.incorrect_answers,
                  questionObject.correct_answer,
                ]),
                correctAnswer: questionObject.correct_answer,
                selectedAnswer: "",
              };
            })
          );
        });
    }
  }, [questions]);

  function updateQuestion(currentQuestion, answer) {
    // console.log(currentQuestion, answer)
    setQuestionsAndAnswers((prev) =>
      prev.map((questionObject) =>
        questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject
      )
    );
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // console.log(questionsAndAnswers)

  function checkAnswer() {
    const notAllAnswered = questionsAndAnswers.some(
      (questionObject) => questionObject.selectedAnswer === ""
    );
    setShowMessage(notAllAnswered);

    if (!notAllAnswered) {
      questionsAndAnswers.forEach((questionObject) => {
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          setNumCorrectAnswers((prevCount) => prevCount + 1);
        }
      });
    }

    setShowResult(true);
  }

  function playAgain() {
    setQuestions([]);
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswers(0);
  }

  console.log(numCorrectAnswers);

  return (
    <>
      <h1>This is the questions page!</h1>
      <div className="questions-container">
        {questionsAndAnswers.map((questionObject, index) => (
          <SingleQuestion
            key={index}
            question={questionObject.question}
            allAnswers={questionObject.shuffledAnswers}
            updateQuestion={updateQuestion}
            selectedAnswer={questionObject.selectedAnswer}
            showResult={showResult}
            correctAnswer={questionObject.correctAnswer}
          />
        ))}
      </div>
      <div className="text-center">
        {showMessage ? (
          <p className="warning-message">Not all questions are answered yet!</p>
        ) : null}
        {questions.length > 0 && !showResult ? (
          <button className="check-btn" onClick={() => checkAnswer()}>
            Check Answer
          </button>
        ) : null}
      </div>
      {showResult ? (
        <div className="text-center">
          <div>You have scored {numCorrectAnswers}/10.</div>
          <button className="play-again-btn" onClick={() => playAgain()}>
            Play again
          </button>
        </div>
      ) : null}
    </>
  );
}
