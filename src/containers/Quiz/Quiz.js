import React, { useState } from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import { useParams } from "react-router-dom";

const Quiz = props => {
	let params = useParams();

	const [results, setResutlt] = useState({})
	const [isFinished, setIsFinished] = useState(false)
	const [activeQuession, setActiveQuession] = useState(0)
	const [answerState, setAnswerState] = useState(null)
	const [quiz, setQuiz] = useState([
		{
			id: 1,
			question: 'Какого цвета небо?',
			rightAnswerId: 2,
			answers: [
				{ text: 'Черный', id: 1 },
				{ text: 'Синий', id: 2 },
				{ text: 'Красный', id: 3 },
				{ text: 'Зеленый', id: 4 },
			]
		},
		{
			id: 2,
			question: 'В каком году основали Санкт-Петербург?',
			rightAnswerId: 3,
			answers: [
				{ text: '1700', id: 1 },
				{ text: '1705', id: 2 },
				{ text: '1703', id: 3 },
				{ text: '1803', id: 4 },
			]
		},
	])

	const onAnswerClickHandler = (answerId) => {
		if (answerState) {
			const key = Object.keys(answerState)[0]
			if (answerState[key] === 'success') {
				return
			}
		}

		const question = quiz[activeQuession]



		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
			}
			setAnswerState({ [answerId]: 'success' })
			setResutlt(results)


			const timeout = window.setTimeout(() => {
				if (isQuizFinished()) {
					setIsFinished(true)
				} else {
					setActiveQuession(activeQuession + 1)
					setAnswerState(null)
				}

				window.clearTimeout(timeout)
			}, 1000)


		} else {
			results[question.id] = 'error'
			setAnswerState({ [answerId]: 'error' })
			setResutlt(results)
		}


	}

	function isQuizFinished() {
		return activeQuession + 1 === quiz.length
	}

	const retryHandler = () => {

		setActiveQuession(0)
		setAnswerState(null)
		setIsFinished(false)
		setResutlt({})
	}

	console.log('Quiz ID = ', params.id);


	return (
		<div className='Quiz'>


			<div className='QuizWrapper'>
				<h1>Ответьте на все вопросы</h1>
				{
					isFinished
						? <FinishedQuiz
							results={results}
							quiz={quiz}
							onRetry={retryHandler}
						/>
						: <ActiveQuiz
							answers={quiz[activeQuession].answers}
							question={quiz[activeQuession].question}
							onAnswerClick={onAnswerClickHandler}
							quizLength={quiz.length}
							answerNumber={activeQuession + 1}
							state={answerState}
						/>
				}

			</div>
		</div>
	)
}

export default Quiz;