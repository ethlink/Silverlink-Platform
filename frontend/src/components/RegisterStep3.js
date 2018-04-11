import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Row, Col } from 'antd';
import validate from '../helpers/validate';
import InputUpload from './InputUpload';

const FormItem = Form.Item;

const RegisterStep3 = props => (
  <Form onSubmit={props.handleSubmit}>
    <h5>Step 3 out of 3</h5>

    <Row>
      <Col span={24} md={{ span: 12, offset: 6 }}>
        <Field
          name="identity"
          type="file"
          component={InputUpload}
          label="Identity Document"
        />

        <Field
          name="residence"
          type="file"
          component={InputUpload}
          label="Proof of Residence"
        />

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
            loading={props.loading}
            htmlType="submit"
          >
            Sign up
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
})(RegisterStep3);
