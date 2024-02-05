import { useState } from 'react'
import './App.scss'
import { useP5 } from 'react-p5'
import rotate_oop from './includes/rotate_oop.jsx'

const Routes = {
  'rotate_oop': rotate_oop,
}
/*
const Routes = {
  '2317': Aoc2317,
  '2314': Aoc2314,
  // Add more routes as needed
}
const routeKey = '2317'
const Component = Routes[routeKey]
<Component />
*/
function App() {

  const routeFromLocalStorage = localStorage.getItem('tiny-new-render')
  const [route, setRoute] = useState(() => {
    const sizeof = Object.keys(Routes).length
    const initialRoute = 
      routeFromLocalStorage ?
      JSON.parse(routeFromLocalStorage) :
      Object.keys(Routes)[
        Math.floor( Math.random() * sizeof )
      ]
    localStorage.setItem('tiny-new-render', JSON.stringify( initialRoute ))
    return initialRoute
  })
  
  const handleSetRoute = (r) => {
    localStorage.setItem("route", JSON.stringify(r)); // save route to local storage
    setRoute(r);
  }

  const Route = Routes[route]
  return (
    <>
      <h1>hello, world</h1>
      <div className="nav">
        {/* New code */}

        {Object.keys(Routes).map((key) => (
          <button
            key={key}
            onClick={() => handleSetRoute(key)}
            className={`btn ${
              routeFromLocalStorage === key || route === key
                ? "btn-current-route"
                : ""
            }`}
          >XYZ
          </button>
          
        ))}
      </div>
      {Routes.hasOwnProperty(route) ? <Route /> : null}
    </>
  )
}

export default App
