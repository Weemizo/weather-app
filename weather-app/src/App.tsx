import './App.css'

function App() {

  return (
    <>
      <main>
        <div className='navbar'>
          Weather App
        </div>

        <div className='contents'>

            <div className='search'>
              <input type="text" placeholder='Search' className='searchBar'/> <div className='lookingGlass'> <img src="./assets/looking-glass.svg" alt="lookingGlass" /> </div>
            </div>

        </div>

      </main>
        {/* https://openweathermap.org/api <<< z tego api bedziemy fetchowac dane do pogody */}
    </>
  )
}

export default App
