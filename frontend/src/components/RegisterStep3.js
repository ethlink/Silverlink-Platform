import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'antd';
import validate from '../helpers/validate';
import InputUpload from './InputUpload';

const FormItem = Form.Item;

const RegisterStep3 = props => (
  <Form onSubmit={props.handleSubmit}>
    <h5>Step 3 out of 3</h5>

    <Field
      name="identity-document"
      type="file"
      component={InputUpload}
      label="Identity Document"
    />

    <Field
      name="proof-of-residence"
      type="file"
      component={InputUpload}
      label="Proof of Residence"
    />

    <FormItem>
      <Button
        type="primary"
        htmlType="submit"
      >
        Sign up
      </Button>
    </FormItem>
  </Form>
);

export default reduxForm({
  form: 'signUp',
  destroyOnUnmount: false,
  validate,
})(RegisterStep3);
