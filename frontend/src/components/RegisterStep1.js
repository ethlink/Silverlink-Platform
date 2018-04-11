import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'antd';
import validate from '../helpers/validate';
import InputText from './InputText';

const FormItem = Form.Item;

const RegisterStep1 = props => (
  <Form onSubmit={props.handleSubmit}>
    <h5>Step 1 out of 3</h5>

    <Field name="email" type="text" component={InputText} placeholder="Email" />
    <Field name="password" type="password" component={InputText} placeholder="Password" />
    <Field
      name="confirm-password"
      type="password"
      component={InputText}
      placeholder="Confirm Password"
    />

    <FormItem>
      <Button
        type="primary"
        htmlType="submit"
      >
        Next
      </Button>
    </FormItem>
  </Form>
);

export default reduxForm({
  form: 'signUp',
  destroyOnUnmount: false,
  initialValues: { country: 'Select country' },
  validate,
})(RegisterStep1);
