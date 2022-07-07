import React from "react";
import classes from "../Login/Login.module.css"

function Input(props) {
    const state = props.state
    return (<div
        className={`${classes.control} ${state.isValid === false ? classes.invalid : ''
            }`}
    >
        <label htmlFor={props.type}>{props.label}</label>
        <input
            type={props.type}
            id={props.type}
            value={state.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    </div>)
}


export default Input