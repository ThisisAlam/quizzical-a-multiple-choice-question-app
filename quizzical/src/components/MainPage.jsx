import { decode } from 'html-entities';
import React, { useMemo } from "react"

export default function MainPage({ quizData }) {
    
    const shuffledQuizData = useMemo(()=>{
        return quizData.map(obj => {
            return {
                ...obj,
                shuffledAnswers: [
                    ...obj.incorrect_answers,
                    obj.correct_answer
                ].sort(() => Math.random() - 0.5)
            }
        })
    }, [quizData])
    
    console.log(shuffledQuizData)

    const [selectedOption, setSelectedOption] = React.useState({})
    const [quizFinished, setQuizFinished] = React.useState(false)
    const [score, setScore] = React.useState(0)

    const questionsFromQuiz = shuffledQuizData.map((obj, questionIndex)=>{
        
        const givenAnswersArray = obj.shuffledAnswers

        function holdAnswer(answer, questionIndex){
            setSelectedOption(prev=>(
                {
                    ...prev,
                    [questionIndex]: answer
                }
            ))
            
        }
        
        const givenAnswerElements = givenAnswersArray.map((answer, answerIndex)=>{
            return (
                <button className="answer-btn"
                    
                    key={answerIndex}
                    
                    disabled={quizFinished}

                    style={{
                        backgroundColor: quizFinished
                        ? answer === obj.correct_answer
                            ? "#94D7A2"
                            : selectedOption[questionIndex] === answer
                                ? "#F8BCBC"
                                : ""
                        : selectedOption[questionIndex] === answer
                            ? "#D6DBF5"
                            : ""
                    }}
                    
                    onClick={()=>holdAnswer(answer, questionIndex)}

                >{decode(answer)}</button>
            )
        })

        return (
            <div className="question-card" key={questionIndex}>
                <h2 className="question-title">
                <span>{questionIndex+1}: </span>{decode(obj.question)}
                </h2>
                <div className="answers-container">
                    {givenAnswerElements}
                </div>
                <hr />
            </div>
        ) 
    })
 
    function checkAnswers(){
        setQuizFinished(true)
        let finalScore = 0
        quizData.forEach((obj, questionIndex) => {
            if(selectedOption[questionIndex] === obj.correct_answer){
                finalScore++
            }
        })
        setScore(finalScore)
    }
 
    return (
    <main className="main-page">
        
        <div className="yellow-blob"></div>
        <div className="blue-blob"></div>
        
        <section className="questions-container">
            {questionsFromQuiz}
            {
                quizFinished 
                ? <div className="results-container">
                    <p className="score-text">
                        You scored {score}/{quizData.length} correct answers
                    </p>
                    <button
                        className="check-btn"
                        onClick={() => window.location.reload()}
                        >
                        Play again
                    </button>
                </div>
                : <button
                    className="check-btn"
                    onClick={checkAnswers}
                    >
                    Check answers
                </button>
            }
        </section>

    </main>
    )
}