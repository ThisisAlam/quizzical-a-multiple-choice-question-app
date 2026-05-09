import React from "react"
import {encode} from 'html-entities';

export default function StartPage({ setQuizData, setQuizStarted }) {

    const [amount, setAmount] = React.useState("10")  
    const [category, setCategory] = React.useState("")
    const [difficulty, setDifficulty] = React.useState("")

    async function startQuiz() {
        const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
        
        try {
            const response = await fetch(apiUrl)
            const data = await response.json()
            console.log(data)
            setQuizData(data.results)
            setQuizStarted(true)
        }
        
        catch(error) {
            console.log("Error fetching questions")
        }
    }

    return (
        <main className="start-page">

            <div className="yellow-blob"></div>
            <div className="blue-blob"></div>

            <section className="start-content">

                <h1 className="start-title">Quizzical</h1>

                <p className="start-description">
                    Test your knowledge with fun trivia questions.
                </p>

                {/* NUMBER OF QUESTIONS */}

                <div className="select-group">
                    <label htmlFor="amount">
                        Number of Questions
                    </label>

                    <select id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}>
                        <option value="5">5 Questions</option>
                        <option value="10">10 Questions</option>
                        <option value="15">15 Questions</option>
                        <option value="20">20 Questions</option>
                    </select>
                </div>

                {/* CATEGORY */}

                <div className="select-group">
                    <label htmlFor="category">
                        Category
                    </label>

                    <select id="category"
                            onChange={(e) => setCategory(e.target.value)}>

                        <option value="">Any Category</option>

                        <option value="9">General Knowledge</option>

                        <option value="17">Science & Nature</option>

                        <option value="18">Science: Computers</option>

                        <option value="21">Sports</option>

                        <option value="22">Geography</option>

                        <option value="23">History</option>

                        <option value="27">Animals</option>

                    </select>
                </div>

                {/* DIFFICULTY */}

                <div className="select-group">
                    <label htmlFor="difficulty">
                        Difficulty
                    </label>

                    <select id="difficulty"
                            onChange={(e) => setDifficulty(e.target.value)}>

                        <option value="">Any Difficulty</option>

                        <option value="easy">Easy</option>

                        <option value="medium">Medium</option>

                        <option value="hard">Hard</option>

                    </select>
                </div>

                {/* START BUTTON */}

                <button className="start-btn"
                        onClick={startQuiz}>
                    Start quiz
                </button>

            </section>

        </main>
    )
}