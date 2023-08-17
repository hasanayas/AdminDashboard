import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../../config";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const LineChart = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const snapshot = await db.collection("users").get();
      const userData = snapshot.docs.map((doc) => doc.data());
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const countUsersByCity = () => {
    const cityCounts = {};
    userData.forEach((user) => {
      const city = user.city;
      if (city in cityCounts) {
        cityCounts[city]++;
      } else {
        cityCounts[city] = 1;
      }
    });

    return Object.entries(cityCounts).map(([city, count]) => ({
      city,
      count,
    }));
  };

  const data = countUsersByCity();

  return (
    <div className="dashboard">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
