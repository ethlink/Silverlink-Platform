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

const InputText = ({ input, options, meta: { error, touched } }) => (
  <FormItem className={(touched && error) ? 'has-error' : ''}>
    <Select defaultValue={options[0]} style={{ maxWidth: 200 }} {...input}>
      {getOptions(options)}
    </Select>

    <div className="ant-form-explain">
      {touched && error}
    </div>
  </FormItem>
);

export default InputText;

