export default function OpenScreen({setShowQuestions}) {
   return(
        <div className="open-screen-content">
            <h1 className="header">Quizzical</h1>
            <p className="description">This is Quizzical quizz moment</p>
            <button onClick={() => setShowQuestions(prev => !prev)} className="start-btn">Start quizz</button>
        </div>
    )
}