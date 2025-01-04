import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

axios.defaults.baseURL = "http://localhost:4000";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className=" text-center">Home Page</h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => {
            return <DoctorList key={doctor.id} doctor={doctor} />;
          })}
      </Row>
    </Layout>
  );
};

export default HomePage;
