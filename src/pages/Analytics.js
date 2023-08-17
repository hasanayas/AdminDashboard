import React from 'react';
import AreaChart from '../components/Charts/AreaChart';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';


const Analytics = () => {
  return (
    <div className="Charts" style={{ width: "96%", height: "100%"}} >
 <AreaChart/>
 <LineChart/>
 <BarChart/>
   
    </div>
  );
};

export default Analytics;
