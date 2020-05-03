import React from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

//to reduce the code
import {Cards, Chart, CountryPicker} from './components';

//use modules for no intereference from other css files
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png'

class App extends React.Component {

    //immediete constructed of component in backend
    state = {
        data:{},
        country:''
    }

    async componentDidMount() {

        const fetchedData = await fetchData();
       
        //pass the values
       this.setState({data:fetchedData});
       
        //console.log(fetcheddata);
    
    }


//COUNTRY PICKING //Pass this as prop
handleCountryChange = async (country) =>{
//Fetch the data // Set the state
console.log(country);
const fetchedData = await fetchData(country);
//console.log(fetchedData);

this.setState({data:fetchedData, country: country});
}


    render(){
//destructurin again
const {data, country} = this.state;
//use props

        return(
            <div className={styles.container}>
            <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;
//axios: making get request to api ; cahrtjs: for charts ; countup: animation of counters
//npm install --save axios react-chartjs-2 react-countup classnames
//npm install --save @material-ui/core bootstrap in CSS