import { useState, useEffect } from 'react'
import './App.css'
import { Autocomplete, TextField } from '@mui/material'
const staedte = [ "Berlin", "Paris", "Madrid"];

const addieren = (x : number, y: number) : number => {
  return x + y;
}
// return typ ist implizit
const addierenKurz = (x : number, y: number) => x+y;

const helloWorld = () => console.log("hello world");

const printArray = () => staedte.map(stadt => console.log(stadt))


function App() {
  const [stadt, setStadt] = useState<string | null>(null);
  // useEffect(()=>{}, [data])
  useEffect(
    () => {console.log({stadt})}
    , [stadt]);

  return (
    <>
      <div className="card">
        <Autocomplete 
        options={staedte}
        value={stadt}
        sx={{ width: 500 }}
        onChange={(__event, value) => setStadt(value)}
        renderInput={(params) => <TextField {...params} label="Bitte wähle eine Stadt aus" />}
        />

       </div>
    </>
  )
}

export default App
