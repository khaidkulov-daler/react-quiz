import './Select.css'

const Select = props => {
	const htmlFor = `${props.label}-${Math.random()}`


	return (
		<div className='Select'>
			<label htmlFor={htmlFor}></label>
			<select
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			>
				{props.options.map((option, index) => {
					return (
						<option
							key={option.value + index}
							value={option.value}
						>
							{option.text}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Select