import {decode} from "html-entities"

export default function(props) {

    console.log(props)
    return(
        <div className="question-container">
            <h1 className='question'>
                {props.question}
            </h1>
            <div className='answers-btn-container'>
                {props.allAnswers.map((answer, i) => (
                    <button className='answer-btn' key={i} onClick={() => {}}>
                        {decode(answer)}
                    </button>
                ))}
            </div>
        </div>
    )
}
