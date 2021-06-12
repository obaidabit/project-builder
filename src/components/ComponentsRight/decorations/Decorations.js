import React, { useEffect, useContext, useState } from "react"
import { ElementContext, ElementContext2 } from "../../../ElementContext"
import { saveRecord, clearRedoRecord } from "../../../undo"
import BorderRadius from "./BorderRadius"
import Border from "./Border"
import Background from "./Background"
import BoxShadow from "./BoxShadow"
import savePage from "../../../savePage"
function Decorations() {
	const [selectedTarget] = useContext(ElementContext2)
	const [selectedElement, setSelectedElement] = useContext(ElementContext)
	const [opacity, setopacity] = useState("")

	useEffect(() => {
		setopacity(selectedElement.opacity)
	}, [selectedElement])

	const updateState = (name, value) => {
		switch (name) {
			case "opacity":
				setopacity(value)
				break
			default:
				break
		}
		savePage(false)
	}

	const handleInput = e => {
		saveRecord(selectedTarget, "style-change")
		clearRedoRecord()
		updateState(e.target.name, e.target.value)
		const temp = selectedElement
		switch (e.target.name) {
			case "opacity":
				temp[e.target.name] = e.target.value
				break
			default:
				break
		}

		setSelectedElement(temp)
		savePage(false)
	}

	return (
		<div style={{ display: "none" }} className="style-group">
			<div className="expand-grid m-t-2">
				<span>Opacity </span>
				<div className="flex-row">
					<input name="opacity" type="range" min="0" max="1" step="0.01" value={opacity ? opacity : "1"} onChange={handleInput}></input>

					<input className="small-input shadow" name="opacity" type="text" value={opacity ? opacity : ""} onChange={handleInput} placeholder="1" />
				</div>
			</div>

			<BorderRadius />
			<Border />
			<BoxShadow />
			<Background />
		</div>
	)
}

export default Decorations
