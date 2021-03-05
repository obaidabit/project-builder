import React from "react";
import NavBar from "./components/Navbar";
import IFrame from './components/IFrame';
import LeftSideMenu from './components/LeftSideMenu';
import RightSideMenu from './components/RightSideMenu';

import "./App.css";

export default function App() {
	const drop = e => {
		e.preventDefault();

		const card_id = e.dataTransfer.getData("card_id");
		const card = document.getElementById(card_id);
		
		e.target.appendChild(card);
	};

	const dragOver = e => {
		e.preventDefault();
	};

	const dragStart = e => {
		const target = e.target;
		e.dataTransfer.setData("card_id", target.id);

		setTimeout(() => {
			target.style.display = "none";
		}, 0);
	};
	const dragOverC = e => {
		e.stopPropagation();
	};

	return (
		<div className="app">
			<NavBar />
			<IFrame />
			<LeftSideMenu />
			<RightSideMenu />
		</div>
	);
}
