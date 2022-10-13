import { useEffect, useState } from "react";
import "./quiz.css";
import useSound from "use-sound";
import play from "../../sounds/play.mp3";
import wait from "../../sounds/wait.mp3";
import wrong from "../../sounds/wrong.mp3";
import correct from "../../sounds/correct.mp3";
import NewGame from "../newGame/NewGame";
import Start from "../start/Start";

export default function Quiz({
  data,
  setStop,
  quesNum,
  setQuesNum,
  setFinished,
}) {
  const [question, setQuestion] = useState(null);
  const [selctedAnswer, setSelctedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [lestPlay] = useSound(play);
  const [correctAns] = useSound(correct);
  const [wrongAns] = useSound(wrong);

  useEffect(() => {
    lestPlay();
  }, [lestPlay]);

  useEffect(() => {
    setQuestion(data[quesNum - 1]);
  }, [data, quesNum]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelctedAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (a.correct) {
        if (quesNum > 14) {
          delay(2000, () => {
            setQuesNum((prev) => prev + 1);
            setStop(true);
            setFinished(true);
          });
        } else {
          correctAns();
          delay(2000, () => {
            setQuesNum((prev) => prev + 1);
            setSelctedAnswer(null);
          });
        }
      } else {
        wrongAns();
        delay(2000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selctedAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
