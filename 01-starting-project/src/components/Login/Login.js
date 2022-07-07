import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../Input/Input';

function emailReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@")}
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@")}
  }

  return {
    value: "",
    isValid: false,
  }
}

function passwordReducer(state, action) {
  if (action.type === "USER_PASSWORD") {
    return { value: action.value, isValid: action.value.trim().length > 6}
  } if (action.type= "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6}
  }
  return { value: "", isValid: false}
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = React.useReducer(emailReducer,
    {
      value: "",
      isValid: false,
    }
  )

  const [passwordState, dispatchPassword] = React.useReducer(passwordReducer,{
    value: "",
    isValid: false,
  })


  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", value: event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "USER_PASSWORD", value: event.target.value})

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})

  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"PASSWORD_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        label="E-Mail"
        state={emailState}
        type="email"
        id="email"
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        ></Input>
           <Input
        label="Password"
        state={passwordState}
        type="password"
        id="password"
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
