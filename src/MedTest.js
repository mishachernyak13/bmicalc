import React, { useState } from "react";
import "./MedTest.css";

function MedTest() {
    const [answers, setAnswers] = useState(Array(7).fill([]));
    const [totalScore, setTotalScore] = useState(0);
    const [resultText, setResultText] = useState("");
    const scores = [0, 1, 2, 3];

    const questionsAnswers = {
        name: "Медичний тест",
        desc: "Тест рівня тривожності",
        questions: [
            {
                name: "*1. Ви нервували, відчували тривогу або були дуже напружені",
                answers: [
                    {
                        name: "Ніколи",
                        is_correct: true,
                        points: 0,
                        type: "checkbox"
                    },
                    {
                        name: "Декілька днів",
                        is_correct: false,
                        points: 1,
                        type: "checkbox"
                    },
                    {
                        name: "Більшу половину часу",
                        is_correct: false,
                        points: 2,
                        type: "checkbox"
                    },
                    {
                        name: "Майже щодня",
                        is_correct: false,
                        points: 3,
                        type: "checkbox"
                    }
                ]
            },
            {
                name: "* 2. Ви не могли зупинити або контролювати своє хвилювання",
                answers: [
                    {
                        name: "Ніколи",
                        is_correct: true,
                        points: 0,
                        type: "checkbox"
                    },
                    {
                        name: "Декілька днів",
                        is_correct: false,
                        points: 1,
                        type: "checkbox"
                    },
                    {
                        name: "Більшу половину часу",
                        is_correct: false,
                        points: 2,
                        type: "checkbox"
                    },
                    {
                        name: "Майже щодня",
                        is_correct: false,
                        points: 3,
                        type: "checkbox"
                    }
                ]
            },
            {
                name: "* 3. Ви занадто хвилювались через різні речі",
                answers: [
                    {
                        name: "Ніколи",
                        is_correct: true,
                        points: 0,
                        type: "checkbox"
                    },
                    {
                        name: "Декілька днів",
                        is_correct: false,
                        points: 1,
                        type: "checkbox"
                    },
                    {
                        name: "Більшу половину часу",
                        is_correct: false,
                        points: 2,
                        type: "checkbox"
                    },
                    {
                        name: "Майже щодня",
                        is_correct: false,
                        points: 3,
                        type: "checkbox"
                    }
                ]
            },
            {
                name: "* 4. Вам було важко розслабитись",
                answers: [
                    {
                        name: "Ніколи",
                        is_correct: true,
                        points: 0,
                        type: "checkbox"
                    },
                    {
                        name: "Декілька днів",
                        is_correct: false,
                        points: 1,
                        type: "checkbox"
                    },
                    {
                        name: "Більшу половину часу",
                        is_correct: false,
                        points: 2,
                        type: "checkbox"
                    },
                    {
                        name: "Майже щодня",
                        is_correct: false,
                        points: 3,
                        type: "checkbox"
                    }
                ]
            },
            {
                name: "* 5. Ви були настільки неспокійні, що Вам було важко всидіти на одному місці",
                answers: [
                    {
                        name: "Ніколи",
                        is_correct: true,
                        points: 0,
                        type: "checkbox"
                    },
                    {
                        name: "Декілька днів",
                        is_correct: false,
                        points: 1,
                        type: "checkbox"
                    },
                    {
                        name: "Більшу половину часу",
                        is_correct: false,
                        points: 2,
                        type: "checkbox"
                    },
                    {
                        name: "Майже щодня",
                        is_correct: false,
                        points: 3,
                        type: "checkbox"
                    }
                ]
            },
            {
                name: "* 6. Вам було легко дошкулити або роздратувати",
                answers: [
                    {
                        name: "Ніколи",
                        is_correct: true,
                        points: 0,
                        type: "checkbox"
                    },
                    {
                        name: "Декілька днів",
                        is_correct: false,
                        points: 1,
                        type: "checkbox"
                    },
                    {
                        name: "Більшу половину часу",
                        is_correct: false,
                        points: 2,
                        type: "checkbox"
                    },
                    {
                        name: "Майже щодня",
                        is_correct: false,
                        points: 3,
                        type: "checkbox"
                    }
                ]
            },
            {
                name: "* 7. Ви відчували страх, неначе щось жахливе може статися",
                answers: [
                    {
                        name: "Ніколи",
                        is_correct: true,
                        points: 0,
                        type: "checkbox"
                    },
                    {
                        name: "Декілька днів",
                        is_correct: false,
                        points: 1,
                        type: "checkbox"
                    },
                    {
                        name: "Більшу половину часу",
                        is_correct: false,
                        points: 2,
                        type: "checkbox"
                    },
                    {
                        name: "Майже щодня",
                        is_correct: false,
                        points: 3,
                        type: "checkbox"
                    }
                ]
            },
        ]
    };

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
    };

    const { name, desc, questions } = questionsAnswers;

    return (
        <div className="med-test-container">
            <h1>{name}</h1>
            <p>{desc}</p>
            <form>
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question-container">
                        <p className="question" dangerouslySetInnerHTML={{ __html: formatQuestion(question.name) }}></p>
                        {question.answers.map((answer, answerIndex) => (
                            <label key={answerIndex} className="answer-label">
                                <input
                                    type={answer.type}
                                    checked={answers[questionIndex].includes(answerIndex)}
                                    onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                                />
                                <span className="answer-text">{answer.name}</span>
                            </label>
                        ))}
                    </div>
                ))}
            </form>
            <button className="result-button" onClick={calculateTotalScore}>
                Результат
            </button>
            <p>Загальна сума балів: {totalScore}</p>
            <p className={`result-text ${resultText !== "" ? "visible" : ""}`}>
                {resultText}
            </p>
        </div>
    );
}

export default MedTest;
