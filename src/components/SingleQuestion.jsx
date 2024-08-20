import { decode } from "html-entities";

export default function (props) {
  function selectedAnswer(currentQuestion, answer) {
    props.updateQuestion(currentQuestion, answer);
  }

  console.log(props);
  console.log(props.correctAnswer);

  return (
    <div className="question-container">
      <h1 className="question">{props.question}</h1>
      <div className="answers-btn-container">
        {props.allAnswers.map((answer, i) => (
          <button
            className={`answer-btn ${
              answer === props.selectedAnswer ? "selected" : ""
            } 
                        ${
                          props.showResult && answer === props.correctAnswer
                            ? "correct"
                            : ""
                        }
                        ${
                          props.showResult &&
                          answer === props.selectedAnswer &&
                          answer !== props.correctAnswer
                            ? "incorrect"
                            : ""
                        }

                        ${
                          props.showResult && answer !== props.correctAnswer
                            ? "dimmed"
                            : ""
                        }

                        `}
            key={i}
            onClick={() => selectedAnswer(props.question, answer)}
          >
            {decode(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}
