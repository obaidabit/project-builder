import savePage from "./savePage";

let undo_record = [];
let redo_record = [];

const saveRecord = (selectedElement, type) => {
  let Record = {
    element: selectedElement,
    ParentElement: null,
    NextElement: null,
    PreviousElement: null,
    action_type: type,
  };
  if (type === "clear-page") {
    let x = "";
    x = selectedElement.body.innerHTML;
    Record.NextElement = x;
    //I used next element to store innerhtml because clone node don't work with frame
  }
  if (type === "style-change") {
    Record.element = selectedElement.cloneNode();
  }
  if (type !== "clear-page") {
    let frame = document.querySelector("iframe");
    Record.ParentElement = frame.contentWindow.document.getElementById(
      Record.element.id
    ).parentElement;
    Record.NextElement = frame.contentWindow.document.getElementById(
      Record.element.id
    ).nextSibling;
    Record.PreviousElement = frame.contentWindow.document.getElementById(
      Record.element.id
    ).previousSibling;
    Record.element.innerHTML = selectedElement.innerHTML;
  }
  undo_record.push(Record);
};
const saveRedoRecord = (selectedElement, type) => {
  let Record = {
    element: selectedElement,
    ParentElement: null,
    NextElement: null,
    PreviousElement: null,
    action_type: type,
  };
  if (type === "style-change") {
    Record.element = selectedElement.cloneNode();
  }
  if (type !== "clear-page") {
    let frame = document.querySelector("iframe");
    Record.ParentElement = frame.contentWindow.document.getElementById(
      Record.element.id
    ).parentElement;
    Record.NextElement = frame.contentWindow.document.getElementById(
      Record.element.id
    ).nextSibling;
    Record.PreviousElement = frame.contentWindow.document.getElementById(
      Record.element.id
    ).previousSibling;
    Record.element.innerHTML = selectedElement.innerHTML;
  }
  redo_record.push(Record);
  // console.log("redo is ")
  // console.log(redo_record);
};

const undo = () => {
  if (undo_record.length) {
    let Record = undo_record.pop();
    let frame = document.querySelector("iframe");
    let element = frame.contentWindow.document.getElementById(
      Record.element.id
    );
    // eslint-disable-next-line default-case
    switch (Record.action_type) {
      case "added":
        saveRedoRecord(element, "added");
        element.remove();
        break;
      case "move":
        saveRedoRecord(element, "move");
        element.remove();
        if (Record.NextElement) {
          Record.ParentElement.insertBefore(Record.element, Record.NextElement);
        } else {
          Record.ParentElement.appendChild(Record.element);
          saveRedoRecord(Record.element, "remove");
        }
        break;
      case "remove":
        if (Record.NextElement) {
          Record.ParentElement.insertBefore(Record.element, Record.NextElement);
        } else {
          Record.ParentElement.appendChild(Record.element);
          saveRedoRecord(Record.element, "remove");
        }
        break;
      case "style-change":
        saveRedoRecord(element, "style-change");
        element.style.cssText = Record.element.style.cssText;
        break;
      case "clear-page":
        saveRedoRecord(Record.element, "clear-page");
        frame.contentWindow.document.body.innerHTML = Record.NextElement;
    }
    savePage();
  }
};
const redo = () => {
  if (redo_record.length) {
    let Record = redo_record.pop();
    let frame = document.querySelector("iframe");
    let element = frame.contentWindow.document.getElementById(
      Record.element.id
    );

    // eslint-disable-next-line default-case
    switch (Record.action_type) {
      case "added":
        if (Record.NextElement)
          Record.ParentElement.insertBefore(
            Record.element,
            Record.PreviousElement
          );
        else Record.ParentElement.appendChild(Record.element);
        saveRecord(Record.element, "added");
        break;
      case "move":
        saveRecord(Record.element, "move");
        Record.element.remove();
        if (Record.NextElement)
          Record.ParentElement.insertBefore(
            Record.element,
            Record.PreviousElement
          );
        else Record.ParentElement.appendChild(Record.element);
        break;
      case "remove":
        saveRecord(Record.element, "remove");
        Record.element.remove();
        break;
      case "style-change":
        // element.style=Record.element.style;
        saveRecord(element, "style-change");
        element.style.cssText = Record.element.style.cssText;
        break;
      case "clear-page":
        saveRecord(Record.element, "clear-page");
        Record.element.body.innerHTML = "";
    }
    savePage();
  }
};
const clearRedoRecord = () => {
  redo_record = [];
};
const clearUndoRecord = () => {
  undo_record = [];
};

// else if (Record.PreviousElement) {
//   console.log("previous element");
//   Record.ParentElement.insertBefore(
//     Record.element,
//     Record.PreviousElement
//   );
// }

export { saveRecord, undo, redo, clearRedoRecord, clearUndoRecord };
