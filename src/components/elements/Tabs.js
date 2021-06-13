import React from "react";

export default function Tabs() {
  return (
    <div className="tab-container">
      <div className="tab">
        <button className="tablinks" data-num="1">
          London
        </button>
        <button className="tablinks" data-num="2">
          Paris
        </button>
        <button className="tablinks" data-num="3">
          Tokyo
        </button>
      </div>

      <div data-label="1" className="tabcontent">
        <h3>London</h3>
        <p>London is the capital city of England.</p>
      </div>

      <div data-label="2" className="tabcontent">
        <h3>Paris</h3>
        <p>Paris is the capital of France.</p>
      </div>

      <div data-label="3" className="tabcontent">
        <h3>Tokyo</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>
    </div>
  );
}
