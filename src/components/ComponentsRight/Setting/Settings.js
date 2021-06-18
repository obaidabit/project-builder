import React, { useState, useContext, useEffect } from "react"
import { ElementContext2 } from "../../../ElementContext"
import savePage from "../../../savePage"
import { saveRecord, clearRedoRecord } from "../../../undo"
import Option from "./Option"

function Settings() {
	const [selectedTarget, setSelectedTarget] = useContext(ElementContext2)
	const [id, setId] = useState("")
	const [title, setTitle] = useState("")

	useEffect(() => {
		setId(selectedTarget.id)
		setTitle(selectedTarget.title)
		console.log(document.getElementById("option"))
		if (selectedTarget.tagName === "SELECT") {
			document.getElementById("option").style.display = "block"
		} else {
			document.getElementById("option").style.display = "none"
		}
	}, [selectedTarget])

	const updateState = (name, value) => {
		switch (name) {
			case "id":
				setId(value)
				break
			case "title":
				setTitle(value)
				break

			default:
				break
		}
		savePage(false)
	}

	const handleText = e => {
		console.log(e)
		let oldId = selectedTarget.id
		updateState(e.target.name, e.target.value)
		const temp = selectedTarget
		temp[e.target.name] = e.target.value
		if (selectedTarget.id !== oldId) {
			saveRecord(selectedTarget, "id-change", oldId)
		} else {
			saveRecord(selectedTarget, "style-change")
		}
		clearRedoRecord()
		setSelectedTarget(temp)
		savePage(false)
	}

	return (
		<div className="style-group" style={{ display: "none" }}>
			<div>
				<span>Id</span>
				<input className="shadow" name="id" type="text" value={id ? id : ""} onChange={handleText} />
			</div>
			<div>
				<span>Title</span>
				<input className="shadow" name="title" type="text" value={title ? title : ""} onChange={handleText} />
			</div>
			<Option />
		</div>
	)
}

export default Settings
