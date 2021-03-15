import React, { Component } from "react";
import { element } from "../changeStyle";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      position: "",
      top: "",
      bottom: "",
      right: "",
      left: "",
    };
  }

  handleSelect = (e) => {
    const name = e.target.name;
    console.log(name);
    this.setState({ [name]: e.target.value });

    if (element.style[name] === "") {
      element.style[name] = e.target.value;
    } else {
      element.style[name] = e.target.value;
    }
  };

  handleInput = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    if (element.style[name] === "") {
      element.style[name] = e.target.value + "px";
    } else {
      element.style[name] = e.target.value + "px";
    }
  };
  render() {
    return (
      <div style={{ display: "none" }}>
        <div>
          <span>Display</span>
          <select
            name="display"
            value={this.state.display}
            onChange={this.handleSelect}
          >
            <option value=""></option>
            <option value="block">block</option>
            <option value="inline">inline</option>
            <option value="inline-block">inline-block</option>
            <option value="flex">flex</option>
            <option value="none">none</option>
          </select>
        </div>
        <div>
          <span>Position </span>
          <select
            name="position"
            value={this.state.position}
            onChange={this.handleSelect}
          >
            <option value=""></option>
            <option value="static">static</option>
            <option value="relative">relative</option>
            <option value="absolute">absolute</option>
            <option value="fixed">fixed</option>
          </select>
        </div>
        <div>
          <span>top </span>
          <input
            name="top"
            type="number"
            value={this.state.top}
            onChange={this.handleInput}
          ></input>
        </div>
        <div>
          <span>bottom </span>
          <input
            name="bottom"
            type="number"
            value={this.state.bottom}
            onChange={this.handleInput}
          ></input>
        </div>
        <div>
          <span>right </span>
          <input
            name="right"
            type="number"
            value={this.state.right}
            onChange={this.handleInput}
          ></input>
        </div>
        <div>
          <span>left </span>
          <input
            name="left"
            type="number"
            value={this.state.left}
            onChange={this.handleInput}
          ></input>
        </div>
      </div>
    );
  }
}

export default General;
