
import InfoBox from './components/InfoBox.js'
import Map from './components/Map'
import LineGraph from './components/LineGraph'
import Table from './components/Table'


import './App.css'

import { SortData } from './util.js'
import { MenuItem, FormControl, Select } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@material-ui/core'

function App() {
  const [countries, SetCountries] = useState([])
  const [tableData, SetTableData] = useState([])
  const [country, SetCountry] = useState('worldwide')
  const [countryInfo, SetCountryInfo] = useState({})

  const onCountryChange = async (e) => {
    const countrycode = e.target.value
    const url =
      countrycode === 'worldwide'
        ? `https://disease.sh/v3/covid-19/countries/all`
        : `https://disease.sh/v3/covid-19/countries/${countrycode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        SetCountryInfo(data)
        SetCountry(countrycode)
      })
  }

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        SetCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          const sortedData = SortData(data)
          SetCountries(countries)
          SetTableData(sortedData)
        })
    }
    fetchData()
  }, [])
  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>Corona app</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>World Wide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__stat'>
          <InfoBox
            title='Corona Virus Cases'
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />

          <InfoBox
            title='Recovery'
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />

          <InfoBox
            title='Deaths'
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3>WorldWide new Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  )
}
export default App
