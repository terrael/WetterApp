import { useState, useEffect } from 'react'
import { fetchWeatherApi } from 'openmeteo';
import './App.css'
import { Autocomplete, TextField } from '@mui/material'
const staedte = [ "Berlin", "Paris", "Madrid"];
import axios from 'axios';

const addieren = (x : number, y: number) : number => {
  return x + y;
}
// return typ ist implizit
const addierenKurz = (x : number, y: number) => x+y;

const helloWorld = () => console.log("hello world");

const printArray = () => staedte.map(stadt => console.log(stadt))



function App() {  
  const [stadt, setStadt] = useState<string | null>(null);
  const [temperatur, setTemperatur] = useState<number |null>(null);

  const url = "https://api.open-meteo.com/v1/forecast";

  // useEffect(()=>{}, [data])u
  useEffect(
    () => {console.log({stadt})}
    , [stadt]);


    async function testGet(){
      axios.get("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => {
        setStadt(response.data.title)
      }) 
    .catch(response => {
      console.log ("Fetching weather")
      console.log(response.data)
    })
    }

    function getLat(stadt : string) : number{
      const staedtelats : Record<string, number> = {
        Berlin : 52.520008,
        Paris : 12,
        Madrid : 20
      };
      return staedtelats[stadt] || 0;
    }

    function getLon(stadt : string) : number{
      const staedtelons : Record<string, number> = {
        Berlin : 13.404954,
        Paris : 12,
        Madrid : 20
      };
      return staedtelons[stadt] || 0;
    }

    async function getWeather(s : string){
      const params = {
        "latitude": [getLat(s)],
        "longitude": [getLon(s)],
        current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
      };
      var tmp = await fetchWeatherApi(url, params);
      var response = tmp[0];
      var current = response.current();
      console.log(response);
      console.log(JSON.stringify(response));
      if(current){
        console.log(current.variables(0)!.value())
      }
    }
  
    function onAutoCompleteChange(event: any, value : string | null){
      setStadt(value);
      if(value){
        getWeather(value);
      }
    }

  return (
    <>
      <div className="card">
        <Autocomplete 
        options={staedte}
        value={stadt}
        sx={{ width: 500 }}
        onChange={onAutoCompleteChange}
        renderInput={(params) => <TextField {...params} label="Bitte wähle eine Stadt aus" />}
        />

       </div>
    </>
  )
}

export default App
