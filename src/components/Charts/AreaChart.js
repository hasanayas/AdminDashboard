import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../../config";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const AreaChart = () => {
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

  const countUsersByDate = () => {
    const dateCounts = {};
    userData.forEach((user) => {
      const date = user.date;
      if (date in dateCounts) {
        dateCounts[date]++;
      } else {
        dateCounts[date] = 1;
      }
    });

    const sortedData = Object.entries(dateCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const data = countUsersByDate();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
