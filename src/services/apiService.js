import { read } from './httpService.js'

async function apiGetAllCities() {
  const result = await read('/cities')
  return result.sort((a,b) => a.name.localeCompare(b.name))
}

async function apiGetCityById(id) {
  return await read(`/cities/${id}`)
}

async function apiGetAllCandidates() {
  return await read('/candidates')
}

async function apiGetCandidateById(id) {
  return await read(`/candidates/${id}`)
}

async function apiGetCandidatesByIds(idArray) {
  const result = []
  for (const id of idArray) {
    result.push(await apiGetCandidateById(id))
  }
  return result
}

async function apiGetCandidateByName(name) {
  const allCandidates = await apiGetAllCandidates()
  const { id } = allCandidates.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  )
  const candidate = await apiGetCandidateById(id)
  return candidate
}

async function apiGetAllElectionData() {
  return await read('/election')
}

async function apiGetElectionDataByCityId(id) {
  return await read(`/election?cityId=${id}`)
}

async function apiGetCityByName(name) {
  const allCities = await apiGetAllCities()
  const { id } = allCities.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  )
  const city = await apiGetCityById(id)
  return city
}

async function apiGetElectionDataByCityName(name) {
  const { id } = await apiGetCityByName(name)
  const result = await read(`/election?cityId=${id}`)
  return result
}

async function apiGetElectionDataByCityNameAndCandidateName(
  cityName,
  candidateName
) {
  const { id: cityId } = await apiGetCityByName(cityName)
  const { id: candidateId } = await apiGetCandidateByName(candidateName)
  const result = await read(
    `/election?cityId=${cityId}&candidateId=${candidateId}`
  )
  return result
}

async function apiGetElectionResultByCityName(name) {
  const city = await apiGetCityByName(name)
  const {
    id: cityId,
    name: cityName,
    votingPopulation,
    absence,
    presence
  } = city

  const electionData = await apiGetElectionDataByCityName(name)
  const candidatesIds = electionData.map((item) => item.candidateId)
  const candidates = await apiGetCandidatesByIds(candidatesIds)

  const result = []

  for (const candidate of candidates) {
    const [{ votes }] = await apiGetElectionDataByCityNameAndCandidateName(
      name.toLowerCase(),
      candidate.name
    )
    const resultObj = {
      candidateId: candidate.id,
      name: candidate.name,
      username: candidate.username,
      votes: votes,
      percent: (votes * 100) / presence
    }
    result.push(resultObj)
  }

  const orderedResultDesc = result.sort((a, b) => b.votes - a.votes)

  const finalResult = {
    cityInfo: {
      cityId,
      cityName
    },
    electionStats: {
      absence,
      presence,
      votingPopulation
    },
    result: orderedResultDesc
  }

  return finalResult
}

async function apiGetElectionsResult(citiesArray, candidatesArray, targetCity) {
  const allCities = citiesArray
  const allCandidates = candidatesArray
  const info = allCities.find(
    (item) => item.name.toLowerCase() === targetCity.toLowerCase()
  )
  const { id: cityId, presence: totalValidVotes } = info
  // get election data for the selected city
  const cityElectionsData = await apiGetElectionDataByCityId(cityId)
  // get all candidate ids then filter candidates for the city election
  const allCandidatesIds = cityElectionsData.map((item) => item.candidateId)
  const cityElectionsCandidates = allCandidates.filter((item) =>
    allCandidatesIds.includes(item.id)
  )
  // compute votes
  cityElectionsCandidates.forEach((candidate) => {
    const votes = cityElectionsData.filter(
      (item) => item.candidateId === candidate.id
    )[0].votes
    candidate.votes = votes
    candidate.percent = (votes * 100) / totalValidVotes
  })
  // order candidates by votes DESC
  const results = cityElectionsCandidates.sort((a, b) => b.votes - a.votes)
  info.totalCandidates = results.length
  return ({ results, info })
}

export {
  apiGetAllCities,
  apiGetCityById,
  apiGetAllCandidates,
  apiGetCandidateById,
  apiGetCandidatesByIds,
  apiGetAllElectionData,
  apiGetElectionDataByCityId,
  apiGetElectionDataByCityName,
  apiGetElectionDataByCityNameAndCandidateName,
  apiGetElectionResultByCityName,
  apiGetElectionsResult
}
