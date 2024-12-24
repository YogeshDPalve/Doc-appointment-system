import React from "react";
import Layout from "../components/Layout";
import { Form, Col, Input, Row, TimePicker } from "antd";

const ApplyDoctor = () => {
  // handle form
  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Layout>
        <h1 className="text-center">Apply Doctor</h1>
        <Form Layout="vertical" onFinish={handleFinish} className="m-3">
          <h4 className=" text-light">Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Contact No" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                la
                bel="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Your Email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                la
                bel="Website"
                name="website"
                required
                rules={[{ required: false }]}
              >
                <Input type="text" placeholder="Your Website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                la
                bel="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Address" />
              </Form.Item>
            </Col>
          </Row>
          <h4 className=" text-light">Professional Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Your Fees" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                la
                bel="Timings"
                name="timings"
                required
                // rules={[{ required: true }]}
              >
                <TimePicker.RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default ApplyDoctor;
