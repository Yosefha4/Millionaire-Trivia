import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Quiz from "./components/quiz/Quiz";
import Timer from "./components/timer/Timer";
import Start from "./components/start/Start";
import NewGame from "./components/newGame/NewGame";
import data from "./data";

function App() {
  const [userName, setUserName] = useState(null);
  const [quesNum, setQuesNum] = useState(1);
  const [stop, setStop] = useState(false);
  const [finished, setFinished] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1,000" },
        { id: 6, amount: "$ 2,000" },
        { id: 7, amount: "$ 4,000" },
        { id: 8, amount: "$ 8,000" },
        { id: 9, amount: "$ 16,000" },
        { id: 10, amount: "$ 32,000" },
        { id: 11, amount: "$ 64,000" },
        { id: 12, amount: "$ 125,000" },
        { id: 13, amount: "$ 250,000" },
        { id: 14, amount: "$ 500,000" },
        { id: 15, amount: "$ 1,000,000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    quesNum > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === quesNum - 1).amount);
  }, [quesNum]);

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {finished && <div> {<NewGame />} </div>}
            {stop ? (
              <div className="containerTxt">
                <div className="endText">
                  <h1>You earend : {earned} </h1>
                </div>
                <button
                  className="newBtn"
                  onClick={() => window.location.reload()}
                >
                  New Game
                </button>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} quesNum={quesNum} />{" "}
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    setStop={setStop}
                    quesNum={quesNum}
                    setQuesNum={setQuesNum}
                    setFinished={setFinished}
                  />
                </div>
              </>
            )}
            {/* {finished && (
              <div> <h1 className="gameOver">Game Overrrrr</h1> </div>
            )} */}
          </div>

          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((item) => (
                <li
                  className={
                    quesNum === item.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{item.id}</span>
                  <span className="moneyListItemAmount">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
