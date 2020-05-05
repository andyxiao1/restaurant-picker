import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import CurrentWeather from './CurrentWeather';

const LATITUDE = '36.1699';
const LONGITUDE = '-115.1398';
const WEATHER_API_KEY = 'ed797d5e04b1dc08c14f6bce3cbb19f1';

class WeatherDashboard extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API_KEY}&units=imperial`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { data } = this.state;
    if (!data || _.isEmpty(data) || _.isEmpty(data.current)) {
      return null;
    }
    return (
      <Card className="p-3 mt-3 text-center">
        <CurrentWeather data={data.current} />
      </Card>
    );
  }
}

export default WeatherDashboard;
