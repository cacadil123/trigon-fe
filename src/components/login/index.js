import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SingleSignOn = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const loginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Please enter phone number').matches(/^[789]\d{9}$/, "Phone Number format should be (9882223456)")
  });

  const formFieldsRegister = [
   
    {
      name: 'phoneNumber',
      type: 'text',
      placeholder: 'Enter phone Number',
      label: 'Phone Number',
      id: 'phoneNumber'

    },
    {
      name: 'fullName',
      type: 'text',
      placeholder: 'Enter Full Name',
      label: 'Full Name',
      id: 'fullName'

    },

    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter Email',
      label: 'Enter your SSO name or Email address:',
      id: 'email'

    },
    

  ];

  const formFieldsLogin = [
    {
      name: 'phoneNumber',
      type: 'text',
      placeholder: 'Enter phone Number',
      label: 'Phone Number',
      id: 'phoneNumber'

    }
  ]

  const optFields = [{
    
      name: 'verificationCode',
      type: 'text',
      placeholder: 'Enter OTP',
      label: 'Phone OTP',
      id: 'verificationCode'

    
  }]

 
  const getApiLink = () =>{
    if(error === 0) {
      return 'http://15.206.169.165/api/v1/users/register';
    }
    if(error === 1){
      return 'http://15.206.169.165/api/v1/users/verify-code';   
    }
    return 'http://15.206.169.165/api/v1/users/verify-user';
  }
  const getAlertType = () => {
    if(type === 'success') {
      return 'alert-success'
    } 
    else if(type === 'fail'){
      return 'alert-danger'
    }
    else {
      return 'alert-warning';
    }
  }
  const getLabel = () => {  
     if(error === 0){
      return 'Register'
    }
    else if(error === 1){
      return 'Verify OTP'
    }
    else {
      return 'Continue';
    }
  }
  

  return (
    <div className="page-wrap gradient-primary">
      <div className="container">
        <div className="content">
          <div className="panel" id="login">
            <h3>Initiate Single Sign-on (SSO)</h3>
            <Formik
              initialValues={{
                phoneNumber: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                // same shape as initial values
            
                  const requestObj = {
                    ...values,
                    meta: (localStorage.getItem('ip')) || '',
                  };
                  axios
                    .post(getApiLink(), requestObj)
                    .then((res) => {
                      setError(res.data.success);
                      setMessage(res.data.message);
                      setType(res.data.type);
                      if(res.data.redirect) {                        
                        setError(null);
                      }
                      if(res.data.redirect === 2) {
                        setError(null);
                      }
                      console.log('res', res);
                    })
                    .catch((err) => {
                      console.log(err.message);
                    });
                  console.log(values);
                
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  {message !== null && (
                    <div className={`alert ${getAlertType()} alert-dismissible`}>
                      <button type="button" class="close" data-dismiss="alert">&times;</button>
                      {message}
                    </div>
                  )}
                  <div className="alert">Please fill your details:</div>
                  {error === null &&
                    formFieldsLogin.map((item) => {
                      return (
                        <div className="form-group">
                          <label htmlFor={item.label}>{item.label}</label>
                          <Field
                            className="form-control no-icon"
                            id={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            tabIndex={1}
                            type={item.type}
                          />
                          {errors[item.name] && touched[item.name] ? (
                            <div style={{ color: "red" }}>
                              {errors[item.name]}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  {error === 0 &&
                    formFieldsRegister.map((item) => {
                      return (
                        <div className="form-group">
                          <label htmlFor={item.label}>{item.label}</label>
                          <Field
                            className="form-control no-icon"
                            id={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            tabIndex={1}
                            type={item.type}
                            required
                          />
                          {errors[item.name] && touched[item.name] ? (
                            <div style={{ color: "red" }}>
                              {errors[item.name]}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  {error === 1 &&
                    optFields.map((item) => {
                      return (
                        <div className="form-group">
                          <label htmlFor={item.label}>{item.label}</label>
                          <Field
                            className="form-control no-icon"
                            id={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            tabIndex={1}
                            type={item.type}
                            required
                          />
                          {errors[item.name] && touched[item.name] ? (
                            <div style={{ color: "red" }}>
                              {errors[item.name]}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                    }
                  <Button label={getLabel()} />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSignOn;