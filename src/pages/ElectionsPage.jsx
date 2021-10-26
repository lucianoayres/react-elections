import { useState, useEffect } from 'react'

import Main from '../components/Main'
import Header from '../components/Header'
import ElectionsInfo from '../components/ElectionsInfo'
import CandidateCard from '../components/CandidateCard'
import CandidateCards from '../components/CandidateCards'
import Select from '../components/Select'
import Loading from '../components/Loading'
import {
  apiGetAllCities,
  apiGetAllCandidates,
  apiGetElectionsResult
} from '../services/apiService'
import Error from '../components/Error'

export default function ElectionsPage() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [allCities, setAllCities] = useState(null)
  const [allCandidates, setAllCandidates] = useState(null)
  const [electionInfo, setElectionInfo] = useState(null)
  const [electionResults, setElectionResults] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // load All Cities and Candidates API Data (runs once)
  useEffect(() => {
    // load API data function
    const getElectionsData = async () => {
      try {
        const backEndDataAllCities = await apiGetAllCities()
        const backEndDataAllCandidates = await apiGetAllCandidates()

        setAllCities(backEndDataAllCities)
        setAllCandidates(backEndDataAllCandidates)
        setSelectedCity(backEndDataAllCities[0].name)
      } catch (error) {
        setError(error.message)
      }
    }
    getElectionsData()
  }, [])

  // load Elections Results API
  useEffect(() => {
    const getElectionResultsData = async () => {
      try {
        if (allCities && allCandidates && selectedCity) {
          const { results, info } = await apiGetElectionsResult(
            allCities,
            allCandidates,
            selectedCity
          )

          setElectionResults(results)
          setElectionInfo(info)
          setLoading(false)
        }
      } catch (error) {
        setError(error.message)
      }
    }
    getElectionResultsData()
  }, [selectedCity, allCities, allCandidates])
  // OBS: O professor só passou 'selectedCity' como parâmetro
  // no projeto dele

  function handleSelectChange(event) {
    const { value: cityName } = event.target
    setSelectedCity(cityName)
  }

  /* Console log test code
  console.log('render')

  if (electionResults) {
    console.log(electionResults)
  }
  */

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  )

  if (error) {
    mainJsx = <Error>{error}</Error>
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <div className="text-center mb-4">
          <Select
            name="selectCity"
            textLabel="Escolha o Município"
            value={selectedCity}
            data={allCities.map((item) => {
              const { id, name } = item
              return { id, name }
            })}
            onChange={handleSelectChange}
          />
        </div>

        <ElectionsInfo
          cityName={selectedCity}
          votingPopulation={electionInfo.votingPopulation}
          absence={electionInfo.absence}
          presence={electionInfo.presence}
          totalCandidates={electionInfo.totalCandidates}
        />

        <CandidateCards>
          {electionResults.map(
            ({ id, name, username, votes, percent }, index) => {
              return (
                <CandidateCard
                  key={id}
                  id={id}
                  name={name}
                  username={username}
                  votes={votes}
                  percent={percent}
                  place={index + 1}
                />
              )
            }
          )}
        </CandidateCards>
      </>
    )
  }

  return (
    <>
      <Header>
        <span className="animate-pulse">⚡</span> Marvel vs DC Elections
      </Header>
      <Main>{mainJsx}</Main>
    </>
  )
}
