import React, {Component} from 'react';
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import {Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import './App.css';

const cities = [
  {name:"Москва", id:"524901"},
  {name:"Санкт-Петербург", id:"498817"},
  {name:"Екатеринбург", id:"1486209"},
  {name:"Челябинск", id:"1508291"}
]

class Display extends Component {
  constructor(){
      super();
      this.state = {
          weatherData: null
      }
  }

  componentDidMount(){
      const id = this.props.id;
      const URL = "http://api.openweathermap.org/data/2.5/weather?id="+
    id +
    "&units=metric&lang=ru&appid=58ac164e016311066afa35a8c0dc7d97";

      fetch(URL).then(res => res.json()).then(json => {
          this.setState({ weatherData: json });
      });

  }

  render(){
      const weatherData = this.state.weatherData;
      if (!weatherData) return <div>Загрузка</div>;
      const weather = weatherData.weather[0];
      const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
      return(
          <div>
              <h1>
                  {weatherData.name}: {weather.description}
                  <img src={iconUrl} alt={weatherData.description} />
              </h1>
              <p>Текущая температура: {weatherData.main.temp}°</p>
              <p>Самая высокая: {weatherData.main.temp_max}°</p>
              <p>Самая низкая: {weatherData.main.temp_min}°</p>
              <p>Скорость ветра: {weatherData.wind.speed} km/hr</p>
          </div>
      );
  }
}

class App extends Component {

  constructor(){
      super();
      this.state = {
          activeCity: 0
      }
  }


  render(){
      const activeCity = this.state.activeCity;

      return(
        <div class = 'container'>
            <Navbar>
            <Navbar.Brand>
                <h3>Weather App</h3>
            </Navbar.Brand>
        </Navbar>        
        <Container>            
            <Row>
                <Col md={4} sm={4}>
                <h3>Город</h3>
                <Nav
                    className = "flex-column"
                    variant="pills"
                    activeKey={activeCity}
                    onSelect={index => {
                    this.setState({activeCity: index });
                    }}
                >
                    {cities.map((place, index) => (
                    <Nav.Link key={index} eventKey={index}>{place.name}</Nav.Link>
                    ))}
                </Nav>
                </Col>
                <Col md={8} sm={8}>
                <Display key={activeCity} id={cities[activeCity].id} />
                </Col>
            </Row>
        </Container>
        </div>
      );
  }
}

export default App;
