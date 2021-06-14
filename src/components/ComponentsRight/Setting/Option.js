import React, { useContext, useState } from "react"
import { ElementContext2 } from "../../../ElementContext"
import savePage from "../../../savePage"

function Option() {
	const [selectedTarget, setSelectedTarget] = useContext(ElementContext2)
	const [modOption, setmodOption] = useState("")
	const [newOption, setnewOption] = useState("")

	const updateState = e => {
		switch (e.target.name) {
			case "new":
				setnewOption(e.target.value)
				break
			case "modifie":
				setmodOption(e.target.value)
				break
			case "index":
				setindexOption(e.target.value)
				break

			default:
				break
		}
		savePage(false)
	}

	const removeOption = e => {
		if (selectedTarget.selectedOptions[0] !== undefined) {
			if (e.target.id === "remove") {
				selectedTarget.removeChild(selectedTarget.selectedOptions[0])
			} else if (e.target.id === "removeAll") {
				const length = selectedTarget.length
				for (let i = length; i >= 0; i--) {
					let te = selectedTarget.options[i]
					if (te !== undefined) selectedTarget.removeChild(te)
				}
			}

			savePage(false)
		}
	}

	const check = e => {
		if (e.keyCode === 13) {
			if (e.target.id == "new") {
				const temp = selectedTarget
				const CreateOption = document.createElement("option")
				CreateOption.appendChild(document.createTextNode(e.target.value))
				temp.appendChild(CreateOption)

				setSelectedTarget(temp)
				setnewOption("")
			} else if (e.target.id == "modifie") {
				const temp = selectedTarget
				if (selectedTarget.selectedOptions[0] !== undefined) {
					temp.selectedOptions[0].innerHTML = e.target.value
				}
				setmodOption("")
				setSelectedTarget(temp)
			}
		}
	}

	return (
		<div id="option">
			<div>
				<span>Create Option</span>
				<input name="new" id="new" type="text" value={newOption} onChange={updateState} onKeyUp={check} />
			</div>

			<div>
				<span>Modifie Option</span>
				<input name="modifie" id="modifie" type="text" value={modOption} onChange={updateState} onKeyUp={check} />
			</div>
			<div>
				<button id="remove" title="selected to  remove Option" type="text" onClick={removeOption}>
					Remove Option
				</button>
				<button id="removeAll" type="text" onClick={removeOption}>
					Remove All Option
				</button>
			</div>
		</div>
	)
}
export default Option
