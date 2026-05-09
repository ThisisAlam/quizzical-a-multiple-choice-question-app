import React from "react"

import StartPage from "./components/StartPage.jsx"
import MainPage from "./components/MainPage.jsx"

import "./App.css"

export default function App(){
  
  function callMainPage(){
    return console.log("Data Called!")
  }
  
  const [quizData, setQuizData] = React.useState([])
  const [quizStarted, setQuizStarted] = React.useState(false)

  return(
    <>
      {
        quizStarted 

        ? <MainPage quizData={quizData} />

        : <StartPage
            setQuizData={setQuizData}
            setQuizStarted={setQuizStarted}
            />
      }
    </>
  )
}