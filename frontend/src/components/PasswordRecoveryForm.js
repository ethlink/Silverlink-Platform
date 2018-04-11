import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import InputText from './InputText';
import validate from '../helpers/validate';

const FormItem = Form.Item;

const PasswordRecoveryForm = props => (
  <div>
    <h2 style={{ marginBottom: 30 }}>Password recovery</h2>

    <Form onSubmit={props.handleSubmit}>
      <Field name="email" type="text" component={InputText} placeholder="Email" />

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          loading={props.loading}
        >
          Send recovery link
        </Button>
      </FormItem>
    </Form>
  </div>
);

export default reduxForm({
  form: 'passwordRecovery',
  validate,
})(PasswordRecoveryForm);
