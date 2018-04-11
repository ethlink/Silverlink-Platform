import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import InputText from './InputText';
import validate from '../helpers/validate';

const FormItem = Form.Item;

const PasswordChange = props => (
  <div>
    <h2 style={{ marginBottom: 30 }}>Password recovery</h2>

    <Form onSubmit={props.handleSubmit}>
      <Field
        name="password"
        type="password"
        component={InputText}
        placeholder="New password"
      />

      <Field
        name="confirm-password"
        type="password"
        component={InputText}
        placeholder="Confirm password"
      />

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          loading={props.loading}
        >
          Change password
        </Button>
      </FormItem>
    </Form>
  </div>
);

export default reduxForm({
  form: 'passwordChange',
  validate,
})(PasswordChange);
