import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../../config";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const BarChartComponent = () => {
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

  const countUsersByCityForBarChart = () => {
    const cityCounts = {};
    userData.forEach((user) => {
      const city = user.city;
      if (city in cityCounts) {
        cityCounts[city]++;
      } else {
        cityCounts[city] = 1;
      }
    });

    const sortedData = Object.entries(cityCounts)
      .map(([city, count]) => ({
        name: city, // X ekseni için "name" kullanılıyor.
        count: count, // Y ekseni için "count" kullanılıyor.
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Şehir adlarına göre alfabetik sıralama.

    return sortedData;
  };

  const dataForBarChart = countUsersByCityForBarChart();

  return (
    <div className="dashboard">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          width={500}
          height={300}
          data={dataForBarChart} 
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" /> // "name" X ekseni için kullanılıyor.
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} /> // "count" Y ekseni için kullanılıyor.
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
