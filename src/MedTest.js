import React, { useState } from "react";
import "./MedTest.css"

function MedTest() {
    const [answers, setAnswers] = useState(Array(7).fill([]));
    const [totalScore, setTotalScore] = useState(0);
    const [resultText, setResultText] = useState("");
    const scores = [0, 1, 2, 3];

    const questions = [
        "* 1. Ви нервували, відчували тривогу або були дуже напружені",
        "* 2. Ви не могли зупинити або контролювати своє хвилювання",
        "* 3. Ви занадто хвилювались через різні речі",
        "* 4. Вам було важко розслабитись",
        "* 5. Ви були настільки неспокійні, що Вам було важко всидіти на одному місці",
        "* 6. Вам було легко дошкулити або роздратувати",
        "* 7. Ви відчували страх, неначе щось жахливе може статися"
    ];

    const answersOptions = [
        ["Ніколи", "Декілька днів", "Більшу половину часу", "Майже щодня"],
        ["Ніколи", "Декілька днів", "Більшу половину часу", "Майже щодня"],
        ["Ніколи", "Декілька днів", "Більшу половину часу", "Майже щодня"],
        ["Ніколи", "Декілька днів", "Більшу половину часу", "Майже щодня"],
        ["Ніколи", "Декілька днів", "Більшу половину часу", "Майже щодня"],
        ["Ніколи", "Декілька днів", "Більшу половину часу", "Майже щодня"],
        ["Ніколи", "Декілька днів", "Більшу половину часу", "Майже щодня"]
    ];

    const formatQuestion = (question) => {
        return question.replace("*", "<span class='required-marker'>*</span>");
    };

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const newAnswers = [...answers];
        const currentAnswers = newAnswers[questionIndex];

        if (currentAnswers.includes(answerIndex)) {
            // Видалення вибраної відповіді, якщо вона вже була обрана
            const updatedAnswers = currentAnswers.filter((index) => index !== answerIndex);
            newAnswers[questionIndex] = updatedAnswers;
        } else {
            // Додавання вибраної відповіді, якщо вона ще не була обрана
            newAnswers[questionIndex] = [...currentAnswers, answerIndex];
        }

        setAnswers(newAnswers);
    };

    const calculateTotalScore = () => {
        const allQuestionsAnswered = answers.every((answer) => answer.length > 0);
        if (!allQuestionsAnswered) {
            alert("Будь ласка, виберіть відповідь на всі питання.");
            return;
        }

        const sum = answers.reduce((acc, answer) => {
            return answer.length > 0
                ? acc + answer.reduce((answerSum, index) => answerSum + scores[index], 0)
                : acc;
        }, 0);
        setTotalScore(sum);

        let resultText = "";
        if (sum >= 0 && sum <= 4) {
            resultText = "Відсутня або мінімальна тривога.";
        } else if (sum >= 5 && sum <= 9) {
            resultText = "Тривога легкого ступеня.";
        } else if (sum >= 10 && sum <= 14) {
            resultText = "Тривога середнього ступеня.";
        } else {
            resultText = "Тривога вираженого ступеня.";
        }
        setResultText(resultText);
    }
    return (
        <div className="med-test-container">
            <h1>Медичний тест</h1>
            <form>
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question-container">
                        <p className="question" dangerouslySetInnerHTML={{ __html: formatQuestion(question) }}></p>
                        {answersOptions[questionIndex].map((answersOptions, answerIndex) => (
                            <label key={answerIndex} className="answer-label">
                                <input
                                    type="checkbox"
                                    checked={answers[questionIndex].includes(answerIndex)}
                                    onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                                />
                                <span className="answer-text">{answersOptions}</span>
                            </label>
                        ))}
                    </div>
                ))}
            </form>
            <button className="result-button" onClick={calculateTotalScore}>Результат</button>
            <p>Загальна сума балів: {totalScore}</p>
            <p className={`result-text ${resultText !== "" ? "visible" : ""}`}>
                {resultText}
            </p>
        </div>
    );
}
export default MedTest;
