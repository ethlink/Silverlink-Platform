import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const getOptions = (options) => {
  const children = [];
  for (let i = 0; i < options.length; i += 1) {
    children.push(<Option key={options[i]}>{options[i]}</Option>);
  }

  return children;
};

// const InputText = ({ input, placeholder, meta: { error, touched } }) => (
const InputText = ({ input, options, meta: { error, touched } }) => (
  <FormItem className={(touched && error) ? 'has-error' : ''}>
    <Select defaultValue={options[0]} style={{ maxWidth: 200 }} {...input}>
      {/* <Option key="1">1</Option>
      <Option key="2">2</Option>
      <Option key="3">3</Option>
      <Option key="4">4</Option>
      <Option key="5">5</Option>
      <Option key="6">6</Option>

      {children} */}

      {getOptions(options)}
    </Select>

    <div className="ant-form-explain">
      {touched && error}
    </div>
  </FormItem>
);

export default InputText;

