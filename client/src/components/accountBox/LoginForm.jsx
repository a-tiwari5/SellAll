import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { useNavigate } from "react-router"
import { LoginUser } from "../../actions/index"
import { connect } from "react-redux";


const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className='error'>
        * {error}
      </div>
    )
  }
}


const renderInput = ({ input, type, placeholder, meta }) => {

  return (
    <>
      <Input {...input} type={type} placeholder={placeholder} />
      <div className=''>
        {renderError(meta)}
      </div>
    </>
  )
}


const LoginForm = (props) => {
  const navigate = useNavigate();
  const { switchToSignup } = useContext(AccountContext);

  const onSubmit = (formValues) => {
    const postdata = async (formValues) => {
      try {
        const res = await axios.post('/auth/login', formValues, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        localStorage.setItem('token', res.data.token)
        if (res.data.user) {
          props.LoginUser(res.data.user)
          navigate('/')
        }
      } catch (err) {
        console.log(err.response.data.error)
        alert(err.response.data.error);
      }
    }
    postdata(formValues)
  }
  return (
    <>
      <BoxContainer>
        <FormContainer onSubmit={props.handleSubmit(onSubmit)}>
          <Field name='email' component={renderInput} type='email' placeholder="Email" />
          <Field name="password" component={renderInput} type='password' placeholder="Password" />
          <Marginer direction="vertical" margin="1.6em" />
          <SubmitButton type="submit">Signin</SubmitButton>
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <Marginer direction="vertical" margin="1em" />
        <MutedLink href="#">
          Don't have an account?{" "}
          <BoldLink href="#" onClick={switchToSignup}>
            Signup
          </BoldLink>
        </MutedLink>
      </BoxContainer>
    </>
  );
}

const validate = (formValues) => {
  const errors = {}
  if (!formValues.email) {
    errors.email = "You must enter an Email"
  }
  if (!formValues.password) {
    errors.password = "You must enter a Password"
  }
  return errors
}

const formWrapped = reduxForm({
  form: 'login',
  validate
})(LoginForm)

export default connect(null, { LoginUser })(formWrapped)