import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [motivation, setMotivation] = useState("");

  const messages = [
    "Ты справишься!",
    "Осталось совсем чуть-чуть!",
    "Не сдавайся",
    "Держись, почти конец!",
    "Молодец, так держать!"
  ];

  useEffect(() => {
    let interval = null;

    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const startTimer = () => {
    if (!name) return alert("Введите имя");

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMotivation(randomMsg);
    setTimeLeft(10);
    setIsTimerRunning(true);
  };

  const resetAll = () => {
    setName("");
    setTimeLeft(null);
    setIsTimerRunning(false);
    setMotivation("");
  };

  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Светлая тема" : "🌙 Тёмная тема"}
      </button>

      <input
        type="text"
        placeholder="Введите имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isTimerRunning}
      />
      <p>Привет, {name}!</p>

      <div>
        <button onClick={startTimer} disabled={isTimerRunning}>
          {isTimerRunning ? "⏳ Таймер идёт..." : "▶️ Старт (10 секунд)"}
        </button>
        <button onClick={resetAll}>🔄 Сброс</button>
      </div>

      {isTimerRunning && <p className="motivator">{motivation}</p>}

      {timeLeft !== null && (
        <h2>
          {timeLeft > 0
            ? `${name}, осталось ${timeLeft} сек`
            : `⏰ Время вышло, ${name || "друг"}!`}
        </h2>
      )}

      {!isTimerRunning && timeLeft === 0 && (
        <button onClick={startTimer}>🔁 Попробовать ещё раз</button>
      )}
    </div>
  );
}
