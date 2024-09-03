import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './QuizList.css'

export default class QuizList extends Component {


	render() {
		return (
			<div className='QuizList'>
				<div>
					<h1>Список тестов</h1>

					<ul>
						{[1, 2, 3].map((quiz, index) => {
							return (
								<li
									key={index}
								>
									<Link to={'/quiz/' + quiz}>
										Тест {quiz}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>


			</div>
		)
	}
}