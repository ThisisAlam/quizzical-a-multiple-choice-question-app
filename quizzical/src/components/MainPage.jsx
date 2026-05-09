import { decode } from 'html-entities';

export default function MainPage({ quizData }) {
    
    const questionsFromQuiz = quizData.map((obj, index)=>{
        
        const answersArray = [...obj.incorrect_answers, obj.correct_answer]
        console.log(answersArray)
        const answerElements = answersArray.map((answer, index)=>{
            return (
                <button className="answer-btn"
                        key={index}
                    >{decode(answer)}</button>
            )
        })

        return (
            <div className="question-card" key={index}>
                <h2 className="question-title">
                   <span>{index+1}: </span>{decode(obj.question)}
                </h2>
                <div className="answers-container">
                    {answerElements}
                </div>
                <hr />
            </div>
        ) 
    })

    console.log(questionsFromQuiz)

    return (
    <main className="main-page">
        
        <div className="yellow-blob"></div>
        <div className="blue-blob"></div>
        
        <section className="questions-container">
            {questionsFromQuiz}
            <button className="check-btn">
                Check answers
            </button>
        </section>

    </main>
    )
}