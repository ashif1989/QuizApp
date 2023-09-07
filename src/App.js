import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [quiz, setQuiz] = useState("");
  const [correctAns, setCorrectAns] = useState([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const callApi = async () => {
      let response = await fetch("https://the-trivia-api.com/v2/questions");
      let data = await response.json();
      setCorrectAns(data[0].correctAnswer);
      setQuiz(data[0].question.text);
      console.log(data[0].correctAnswer);
    };

    callApi();
  }, [result]);

  let handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  let handleVerify = () => {
    let ansToL = answer.toLowerCase();
    let correctAnstoL = correctAns.toLowerCase();

    if (ansToL === correctAnstoL) {
      setResult("Correct, Well Done !!!");
    } else {
      setResult("Better luck next time !!!");
    }
    setAnswer("");
  };

  return (
    <div className="App">
      <h1>Quiz APP</h1>
      <label>Quiz: </label>
      {quiz}
      <br />
      <br />
      <label>Enter the Answer: </label>
      <input type="text" value={answer} onChange={(e) => handleAnswer(e)} />
      <button onClick={handleVerify}>Verify</button>
      <div>{result}</div>
    </div>
  );
}
