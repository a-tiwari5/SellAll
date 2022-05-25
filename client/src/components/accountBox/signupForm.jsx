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

function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate();

  const onSubmit = (formValues) => {
    const postdata = async (formValues) => {
      try {
        const res = await axios.post('/auth/register', formValues, {
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
        console.log(err)
        // alert(err.response.data.error);
      }
    }
    // console.log(formValues)
    postdata(formValues)
  }


  return (
    <BoxContainer>
      <FormContainer onSubmit={props.handleSubmit(onSubmit)}>
        <Field name="name" component={renderInput} type='text' placeholder='Full Name' />
        <Field name="email" component={renderInput} type='email' placeholder="Email" />
        <Field name="password" component={renderInput} type='password' placeholder="Password" />
        <Marginer direction="vertical" margin={20} />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}


const validate = (formValues) => {
  const errors = {}
  if (!formValues.name) {
    errors.name = "You must enter a name"
  }
  if (!formValues.password) {
    errors.password = "You must enter a Password"
  }
  if (!formValues.email) {
    errors.email = "You must enter an Email"
  }
  return errors
}




const formWrapped = reduxForm({
  form: 'signup',
  validate
})(SignupForm)


export default connect(null, { LoginUser })(formWrapped)