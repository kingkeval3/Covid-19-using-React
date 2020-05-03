import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data :{confirmed, recovered, deaths}, country}) => {

    //to avoid lengthy code , we get with set, no need liek this.setState
const [dailyData, setDaiyData]=useState([]);


useEffect( () =>{

const fetchAPI = async() =>{
//  const dailyData= await fetchDailyData(); no need to use another variable

setDaiyData(await fetchDailyData());
}
//console.log(dailyData);
fetchAPI();
},[]);
//[] to make it run only once and faster
//LINE GLOBAL CHART
const lineChart = (
    dailyData.length ?
(
<Line 
data={{
labels: dailyData.map(({date})=> date),
datasets: [{
    data: dailyData.map(({confirmed})=> confirmed),
    label: 'Infected',
    borderColor: '#3333ff',
    fill:true 
},
{
    data: dailyData.map(({deaths})=> deaths),
    label: 'Deaths',
    borderColor: 'red',
    backgroundColor:'rgb(255,0,0,0.5)',
    fill:true 
}
],
}
}
/>) : null
);

console.log(confirmed, recovered, deaths);
const barChart = (

    confirmed ? 
(
<Bar 

data={{
labels:['Infected','Recovered','Deaths'],
datasets: [{
    label:'People',
    backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
    data: [confirmed.value,recovered.value,deaths.value]
}]

}}

options={{
legend:{display:false},
title: {display:true, text:`Current State in ${country}`}
}}


/>
) : null


)

    return(
        <div className={styles.container}>
         {country ? barChart : lineChart}
        </div>
    )
    
}

export default Chart;
//npm install --save chart.js for charts to run