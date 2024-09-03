import React, { useState } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import './Auth.css'

const Auth = props => {
	const [isFormValid, setIsFormValid] = useState(false)
	const [formControls, setFormControls] = useState({
		email: {
			value: '',
			type: 'email',
			label: 'Email',
			errorMessage: 'Введите корректный email',
			valid: false,
			touched: false,
			validation: {
				required: true,
				email: true
			}
		},
		password: {
			value: '',
			type: 'password',
			label: 'Пароль',
			errorMessage: 'Введите корректный пароль',
			valid: false,
			touched: false,
			validation: {
				required: true,
				minLength: 6
			}
		}
	})

	const loginHandler = () => {

	}
	const registerHandler = () => {

	}
	const submitHandler = (event) => {
		event.preventDefault()
	}

	const validateControl = (value, validation) => {
		if (!validation) return true

		let isValid = true

		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (validation.email) {
			const validateEmail = (email) => {
				return String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
			};
			isValid = validateEmail(value) && isValid
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}

		return isValid
	}

	const onChangeHandler = (event, controlName) => {

		const control = { ...formControls[controlName] }
		let newFormControls = { ...formControls }

		control.value = event.target.value
		control.touched = true
		control.valid = validateControl(control.value, control.validation)

		newFormControls[controlName] = control

		let newIsFormValid = true

		Object.keys(newFormControls).forEach(name => {
			newIsFormValid = newFormControls[name].valid && newIsFormValid
		})

		setFormControls(newFormControls)
		setIsFormValid(newIsFormValid)
	}



	const renderInputs = () => {
		return Object.keys(formControls).map((controlName, index) => {
			const control = formControls[controlName]
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={(event) => onChangeHandler(event, controlName)}
				/>
			)
		})
	}

	return (
		<div className='Auth'>
			<div>
				<h1>Авторизация</h1>

				<form onSubmit={submitHandler} className='AuthForm'>

					{renderInputs()}

					<Button
						type='success'
						onClick={loginHandler}
						disabled={!isFormValid}
					>
						Войти
					</Button>

					<Button
						type='primary'
						onClick={registerHandler}
						disabled={!isFormValid}
					>
						Зарегистрироваться
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Auth