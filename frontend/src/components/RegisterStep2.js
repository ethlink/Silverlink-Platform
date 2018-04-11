import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Row, Col } from 'antd';
import InputText from './InputText';
import InputSelect from './InputSelect';

import validate from '../helpers/validate';
import countries from '../helpers/countries';

const FormItem = Form.Item;

const RegisterStep2 = props => (
  <Form onSubmit={props.handleSubmit}>
    <h5>Step 2 out of 3</h5>

    <Row gutter={24}>
      <Col span={24} md={8} lg={{ span: 6, offset: 3 }}>
        <Field name="firstName" type="text" component={InputText} placeholder="First name" />
        <Field name="middleName" type="text" component={InputText} placeholder="Middle name" />
        <Field name="surname" type="text" component={InputText} placeholder="Surname" />
      </Col>

      <Col span={24} md={8} lg={6}>
        <Field name="address" type="text" component={InputText} placeholder="Address" />
        <Field name="postalcode" type="text" component={InputText} placeholder="Postal code" />
        <Field name="country" component={InputSelect} options={countries} />
      </Col>

      <Col span={24} md={8} lg={6}>
        <Field name="city" type="text" component={InputText} placeholder="City" />
        <Field name="state" type="text" component={InputText} placeholder="State" />
      </Col>

      <Col span={24}>
        <FormItem>
          <Button
            type="secondary"
            htmlType="button"
            onClick={props.previousPage}
            style={{ marginRight: 15 }}
          >
            Back
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Next
          </Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
);

export default reduxForm({
  form: 'signUp',
  destroyOnUnmount: false,
  validate,
})(RegisterStep2);
