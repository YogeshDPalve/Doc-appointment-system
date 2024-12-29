import React from "react";
import Layout from "../components/Layout";
import { Form, Col, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Doctor applied successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Error in applying doctor");
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="text-dark mt-4">Personal Details</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true },
                { len: 10, message: "Phone number must be exactly 10 digits" },
              ]}
            >
              <Input type="text" placeholder="Your Contact No" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" placeholder="Your Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="Your Website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Address" />
            </Form.Item>
          </Col>
        </Row>
        <h4 className="text-dark mt-4">Professional Details</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerConsultation"
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="Your Fees" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="mt-2">
            <Form.Item
              label="Timings"
              name="timings"
              rules={[{ required: true, message: "Please select timings" }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button type="submit" className="btn btn-primary form-btn">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
