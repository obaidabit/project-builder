import React, { useRef, useEffect, useContext } from "react";
import { ElementContext2 } from "../ElementContext";
import { MdClose } from "react-icons/md";
import resize from "../resize";
import savePage from "../savePage";

export default function VideoEdit(props) {
  const [selectedTarget, setSelectedTarget] = useContext(ElementContext2);
  const videoURL = useRef(null);
  const edit = useRef(null);
  const source = useRef(null);

  const convertTag = (element, type, src) => {
    if (!element && !type && !src) return;
    const iframeDoc = document.querySelector("iframe").contentWindow.document;
    let target;

    if (type === "youtube") {
      target = iframeDoc.createElement("iframe");
      target.src =
        "https://www.youtube.com/embed/" + src.replace("https://youtu.be/", "");
    } else {
      target = iframeDoc.createElement("video");
      target.src = src;
    }
    for (let i = 0; i < element.attributes.length; i++) {
      if (element.attributes[i].name === "src") continue;
      target.setAttribute(
        element.attributes[i].name,
        element.attributes[i].value
      );
    }
    return target;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let video;

    if (videoURL.current && selectedTarget && videoURL.current.value) {
      const autopaly = document.getElementById("autoplay");
      const loop = document.getElementById("loop");
      const controls = document.getElementById("controls");

      if (source.current.value === "Any") {
        video = convertTag(selectedTarget, "video", videoURL.current.value);
        video.autoplay = autopaly.checked;
        video.loop = loop.checked;
        video.controls = controls.checked;
      } else {
        video = convertTag(selectedTarget, "youtube", videoURL.current.value);
        video.src += `?${autopaly.checked ? "&autoplay=1" : ""}${
          loop.checked ? "&loop=1" : ""
        }${controls.checked ? "" : "&controls=0"}`;
      }

      const parent = selectedTarget.parentElement;
      parent.appendChild(video);
      selectedTarget.remove();
      setSelectedTarget(video);
      savePage(false);
    }
  };

  const hide = () => {
    props.hide(false);
  };

  useEffect(() => {
    if (selectedTarget && edit.current) {
      resize(edit.current, selectedTarget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  if (props.show)
    return (
      <div ref={edit} className="image-edit shadow">
        <div className="media-label ">
          <span>Video Source</span>
          <MdClose onClick={hide} />
        </div>
        <div>
          <form className="media-form" onSubmit={handleSubmit}>
            <span className="checkbox-label">Source :</span>
            <select ref={source}>
              <option>Any</option>
              <option>YouTube</option>
            </select>
            <input
              className="shadow"
              type="text"
              placeholder="URL"
              ref={videoURL}
            />
            <input className="shadow" type="submit" value="Add video" />
          </form>
        </div>
        <div className="video-atr">
          <label className="checkbox-label" htmlFor="autopaly">
            Autoplay
          </label>
          <input type="checkbox" id="autoplay" />
          <label className="checkbox-label" htmlFor="loop">
            Loop
          </label>
          <input type="checkbox" id="loop" />
          <label className="checkbox-label" htmlFor="controls">
            Controls
          </label>
          <input type="checkbox" id="controls" />
        </div>
      </div>
    );
  return null;
}
