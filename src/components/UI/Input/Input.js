import './Input.css'

function isValid({ valid, touched, shouldValidate }) {
	return !valid && shouldValidate && touched
}

const Input = props => {
	const inputType = props.type || 'text'
	const classes = ['Input']
	const htmlFor = `${inputType}-${Math.random()}`

	if (isValid(props)) {
		classes.push('invalid')
	}

	return (
		<div className={classes.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			/>

			{
				isValid(props)
					? <span>{props.errorMessage || 'Введите верное значение'}</span>
					: null
			}

		</div>
	)
}

export default Input