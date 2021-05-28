import React, { useState, useContext, useEffect } from "react";
import { ElementContext2 } from "../../ElementContext";
import { saveRecord, clearRedoRecord } from "../../undo";

function Settings() {
	const [selectedTarget, setSelectedTarget] = useContext(ElementContext2);
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		setId(selectedTarget.id);
		setTitle(selectedTarget.title);
	}, [selectedTarget]);

	const updateState = (name, value) => {
		switch (name) {
			case "id":
				setId(value);
				break;
			case "title":
				setTitle(value);
				break;

			default:
				break;
		}
	};

	const handleText = e => {
		let oldId = selectedTarget.id;
		updateState(e.target.name, e.target.value);
		const temp = selectedTarget;
		temp[e.target.name] = e.target.value;
		if (selectedTarget.id !== oldId) {
			saveRecord(selectedTarget, "id-change", oldId);
		} else {
			saveRecord(selectedTarget,"style-change");
		}
		clearRedoRecord();
		setSelectedTarget(temp);
	};

	return (
		<div style={{ display: "none" }}>
			<div>
				<div>Id</div>
				<input name="id" type="text" value={id ? id : ""} onChange={handleText} />
			</div>
			<div>
				<div>Title</div>
				<input name="title" type="text" value={title ? title : ""} onChange={handleText} />
			</div>
		</div>
	);
}

export default Settings;
