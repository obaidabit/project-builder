import React, { useEffect, useContext, useState } from "react"
import { ElementContext, ElementContext2 } from "../../../ElementContext"
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti"
import FlexChildern from "./FlexChildern"
import { saveRecord, clearRedoRecord } from "../../../undo"
import savePage from "../../../savePage"

function Flex() {
	const [selectedTarget] = useContext(ElementContext2)
	const [selectedElement, setSelectedElement] = useContext(ElementContext)
	const [display, setDisplay] = useState("")
	const [flexDirection, setflexDirection] = useState("")
	const [justifyContent, setjustifyContent] = useState("")
	const [alignItems, setalignItems] = useState("")
	const [order, setorder] = useState("")
	const [alignSelf, setalignSelf] = useState("")

	useEffect(() => {
		setDisplay(selectedElement.display)
		setflexDirection(selectedElement.flexDirection)
		setjustifyContent(selectedElement.justifyContent)
		setalignItems(selectedElement.alignItems)
		setorder(selectedElement.order)
		setalignSelf(selectedElement.alignSelf)
	}, [selectedElement])

	const updateState = (name, value) => {
		switch (name) {
			case "display":
				setDisplay(value)
				break
			case "flexDirection":
				setflexDirection(value)
				break
			case "justifyContent":
				setjustifyContent(value)
				break
			case "alignItems":
				setalignItems(value)
				break
			case "order":
				setorder(value)
				break
			case "alignSelf":
				setalignSelf(value)
				break
			default:
				break
		}
		savePage(false)
	}

	const handleSelect = e => {
		saveRecord(selectedTarget, "style-change")
		clearRedoRecord()
		updateState(e.target.name, e.target.value)
		const temp = selectedElement
		temp[e.target.name] = e.target.value
		setSelectedElement(temp)
		savePage(false)
	}

	const handleInput = e => {
		saveRecord(selectedTarget, "style-change")
		clearRedoRecord()
		updateState(e.target.name, e.target.value)
		const temp = selectedElement
		switch (e.target.name) {
			case "order":
				temp[e.target.name] = e.target.value
				break
			default:
				break
		}

		setSelectedElement(temp)
		savePage(false)
	}
	const checkInput = e => {
		var ch = String.fromCharCode(e.which)
		if (!/[0-9-auto]/.test(ch)) {
			e.preventDefault()
		}
	}
	const increase = e => {
		var value = e.target.value
		if (value === "") {
			updateState(e.target.name, "0")
		} else {
			value = parseInt(value) + 1
			e.target.value = value.toString()
			updateState(e.target.name, e.target.value)
			handleInput(e)
		}
		savePage(false)
	}

	const decrease = e => {
		var value = e.target.value
		if (value === "") {
			updateState(e.target.name, "0")
		} else {
			value = parseInt(value) - 1
			e.target.value = value.toString()
			updateState(e.target.name, e.target.value)
			handleInput(e)
		}
		savePage(false)
	}

	return (
		<div style={{ display: "none" }} className="style-group">
			<div>
				<span>Display</span>

				<div className="shadow">
					<select name="display" value={display ? display : ""} onChange={handleSelect}>
						<option value=""></option>
						<option value="block">Disable</option>
						<option value="flex">Enable</option>
					</select>
				</div>
			</div>

			<div>
				<span>Direction </span>

				<div className="shadow">
					<select name="flexDirection" value={flexDirection ? flexDirection : ""} onChange={handleSelect}>
						<option value=""></option>
						<option value="row">Row</option>
						<option value="row-reverse">Row Reverse</option>
						<option value="column">Column</option>
						<option value="column-reverse">Column Reverse</option>
					</select>
				</div>
			</div>

			<div>
				<span>justify </span>

				<div className="shadow">
					<select name="justifyContent" value={justifyContent ? justifyContent : ""} onChange={handleSelect}>
						<option value=""></option>
						<option value="flex-start">Start</option>
						<option value="flex-end">End</option>
						<option value="space-between">Space between</option>
						<option value="space-around">Space around</option>
						<option value="center">Center</option>
					</select>
				</div>
			</div>

			<div>
				<span>align </span>

				<div className="shadow">
					<select name="alignItems" value={alignItems ? alignItems : ""} onChange={handleSelect}>
						<option value=""></option>
						<option value="flex-start">Start</option>
						<option value="flex-end">End</option>
						<option value="stretch">Stretch</option>
						<option value="center">Center</option>
					</select>
				</div>
			</div>

			<div>
				<span>order </span>

				<div className="flex-row shadow">
					<input name="order" type="text" value={order ? order : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>

					<div className="white">
						<button id="+order" name="order" value={order ? order : ""} onClick={increase} style={{ display: "none" }} />
						<label className="icon-label" htmlFor="+order">
							<TiArrowSortedUp />
						</label>

						<button id="-order" name="order" value={order ? order : ""} onClick={decrease} style={{ display: "none" }} />
						<label className="icon-label" htmlFor="-order">
							<TiArrowSortedDown />
						</label>
					</div>
				</div>
			</div>

			<div>
				<span>align Self </span>

				<div className="shadow">
					<select name="alignSelf" value={alignSelf ? alignSelf : ""} onChange={handleSelect}>
						<option value=""></option>
						<option value="auto">Auto</option>
						<option value="flex-start">Start</option>
						<option value="flex-end">End</option>
						<option value="stretch">Stretch</option>
					</select>
				</div>
			</div>
			<FlexChildern />
		</div>
	)
}

export default Flex
