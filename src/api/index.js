import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

//CARDS DATA
//as we r goin to write async function use async keyword
export const fetchData = async (country) => {

    let changeableUrl = url;

if(country){
    changeableUrl=`${url}/countries/${country}`;
}


try {
    //use await while dealin with async func
// const response = await axios.get(url);

//complete destructrin...
const {data : {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);


// const modifiedData = {

// confirmed: data.confirmed,
// recovered: data.recovered,
// deaths: data.deaths, 
// lastUpdate: data.lastUpdate


// }

return {confirmed, recovered, deaths, lastUpdate};

//return response;

} catch (error) {
    console.log(error);
}
}


//GLOBAL DATA FETCH
export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        //console.log(data);

        //We can do the previous technique but here data is an array so we loop over it and return in the form of objects using {}
        const modifiedData = data.map((dailyData) => ({
confirmed: dailyData.confirmed.total,
deaths: dailyData.deaths.total,
date: dailyData.reportDate
         } ));
    return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

//COUNTRY SELECTOR
 export const fetchCountries = async () => {
     try {
         //destructurin...
        const {data:{countries}} = await axios.get(`${url}/countries`);


return countries.map((country)=>country.name);

        //console.log(response);
     } catch (error) {
         
     }
     
 }