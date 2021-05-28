import savePage from "./savePage";

let undo_record = [];
let redo_record = [];

const saveRecord = (selectedElement, type,oldId) => {
  let Record = {
    element: selectedElement.cloneNode(),
    ParentElement: null,
    NextElement: null,
    PreviousElement: null,
    action_type: type,
  };
  if(oldId!=null){
    Record.oldId=oldId;
  }
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
  undo_record.push(Record);
};
const saveRedoRecord = (selectedElement, type) => {
  let Record = {
    element: selectedElement.cloneNode(),
    ParentElement: null,
    NextElement: null,
    PreviousElement: null,
    action_type: type,
  };
  Record.element.innerHTML = selectedElement.innerHTML;
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
  redo_record.push(Record);
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
        if (Record.PreviousElement)
          Record.ParentElement.insertBefore(element, Record.NextElement);
        else if (Record.NextElement)
          Record.ParentElement.insertBefore(element, Record.PreviousElement);
        else Record.ParentElement.appendChild(element);
        break;
      case "remove":
        if (Record.PreviousElement)
          Record.ParentElement.insertBefore(
            Record.element,
            Record.PreviousElement
          );
        else if (Record.NextElement)
          Record.ParentElement.insertBefore(Record.element, Record.NextElement);
        else Record.ParentElement.appendChild(Record.element);
        saveRedoRecord(Record.element, "remove");
        break;
      case "style-change":
        saveRedoRecord(element, "style-change");
        element.style.cssText = Record.element.style.cssText;
        break;
      case "id-change":
        element.id=Record.oldId;
        
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
        if (Record.PreviousElement)
          Record.ParentElement.insertBefore(Record.element, Record.NextElement);
        else if (Record.NextElement)
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
        if (Record.PreviousElement)
          Record.ParentElement.insertBefore(Record.element, Record.NextElement);
        else if (Record.NextElement)
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
    }
    savePage();
  }
};
const clearRedoRecord = () => {
  redo_record = [];
};

export { saveRecord, undo, redo, clearRedoRecord };
