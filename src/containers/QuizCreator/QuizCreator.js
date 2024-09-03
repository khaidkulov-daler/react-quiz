import { useState } from 'react'
import Button from '../../components/UI/Button/Button'
import './QuizCreator.css'
import { createControl, validateForm } from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { validate } from '../../form/formFramework'

function createFormControl() {
	return {
		question: createControl({
			label: 'Введите вопрос',
			errorMessage: 'Вопрос не может быть пустым'
		}, { required: true }),
		option1: createControl({
			label: 'Вариант 1',
			errorMessage: 'Значение не может быть пустым'
		}, { required: true }),
		option2: createControl({
			label: 'Вариант 2',
			errorMessage: 'Значение не может быть пустым'
		}, { required: true }),
		option3: createControl({
			label: 'Вариант 3',
			errorMessage: 'Значение не может быть пустым'
		}, { required: true }),
		option4: createControl({
			label: 'Вариант 4',
			errorMessage: 'Значение не может быть пустым'
		}, { required: true }),
	}
}

const QuizCreator = props => {
	const [quiz, setQuiz] = useState([])
	const [isFormValid, setIsFormValid] = useState(false)
	const [rightAnswerId, setRightAnswerId] = useState(1)
	const [formControls, setFormControls] = useState(createFormControl())


	const submitHandler = event => {
		event.preventDefault()
	}

	const addQuestionHandler = event => {
		event.preventDefault()

		const newQuiz = quiz.concat()
		const index = newQuiz.length + 1

		const { question, option1, option2, option3, option4 } = formControls

		const questionItem = {
			question: question.value,
			id: index,
			rightAnswerId: rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
			]
		}

		newQuiz.push(questionItem)

		setQuiz(newQuiz)
		setIsFormValid(false)
		setRightAnswerId(1)
		setFormControls(createFormControl())
	}

	const createQuestionHandler = event => {
		event.preventDefault()
		console.log(quiz);
	}

	const changeHandler = (value, controlName) => {
		const control = { ...formControls[controlName] }
		const newFormControls = { ...formControls }

		control.touched = true
		control.value = value
		control.valid = validate(control.value, control.validation)

		newFormControls[controlName] = control

		setIsFormValid(validateForm(newFormControls))
		setFormControls(newFormControls)

	}
	// console.log(formControls);

	const renderControls = () => {

		return Object.keys(formControls).map((controlName, index) => {
			const control = formControls[controlName]


			return (
				<>
					<Input
						key={index}
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event => changeHandler(event.target.value, controlName)}
					/>
					{index === 0 ? <hr /> : null}
				</>
			)
		})
	}

	const selectChangeHandler = event => {
		setRightAnswerId(+event.target.value)
	}

	const select = <Select
		label='Выберите правильный ответ'
		value={rightAnswerId}
		onChange={selectChangeHandler}
		options={[
			{ text: 1, value: 1 },
			{ text: 2, value: 2 },
			{ text: 3, value: 3 },
			{ text: 4, value: 4 },
		]}
	/>

	return (
		<div className='QuizCreator'>
			<div>
				<h1>Создание теста</h1>

				<form onSubmit={submitHandler}>

					{renderControls()}

					{select}

					<Button
						type='primary'
						onClick={addQuestionHandler}
						disabled={!isFormValid}
					>
						Добавить вопрос
					</Button>
					<Button
						type='success'
						onClick={createQuestionHandler}
						disabled={quiz.length === 0}
					>
						Создать тест
					</Button>
				</form>
			</div>
		</div>
	)
}

export default QuizCreator 