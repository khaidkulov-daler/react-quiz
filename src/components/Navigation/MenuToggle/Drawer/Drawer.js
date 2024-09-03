import React, { Component } from "react";
import './Drawer.css'
import Backdrop from "../../../UI/Button/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

const links = [
	{ to: '/', label: 'Список', exact: true },
	{ to: '/auth', label: 'Авторизация', exact: false },
	{ to: '/quiz-creator', label: 'Создать тест', exact: false },
]

class Drawer extends Component {

	clickHandler = () => {
		this.props.onClose()
	}

	renderLinks() {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						// exact={link.exact.toString}
						onClick={this.clickHandler}
					>
						{link.label}
					</NavLink>
				</li>
			)
		})
	}

	render() {
		const classes = ['Drawer']

		if (!this.props.isOpen) {
			classes.push('close')
		}

		return (
			<>

				<nav className={classes.join(' ')}>
					<ul>
						{this.renderLinks()}
					</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
			</ >
		)
	}
}

export default Drawer