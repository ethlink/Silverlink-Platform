import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const InputText = ({
  input, type, placeholder, meta: { error, touched },
}) => (
  <FormItem className={(touched && error) ? 'has-error' : ''}>
    <Input
      {...input}
      type={type}
      placeholder={placeholder}
    />

    <div className="ant-form-explain">
      {touched && error}
    </div>
  </FormItem>
);

export default InputText;

