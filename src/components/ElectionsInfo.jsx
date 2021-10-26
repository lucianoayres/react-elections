import { GrGroup, GrCheckboxSelected, GrClear } from 'react-icons/gr'
import { helperFormatNumber, helperCalculatePercent } from '../helpers/formatNumberHelpers'

export default function ElectionsInfo({
  cityName = null,
  votingPopulation = null,
  absence = null,
  presence = null,
  totalCandidates = null
}) {

  const presencePercent = helperCalculatePercent(presence, votingPopulation)
  const absencePercent = helperCalculatePercent(absence, votingPopulation)
  const displayVotingPopulation = helperFormatNumber(votingPopulation)
  const displayAbsence = helperFormatNumber(absence)
  const displayPresence = helperFormatNumber(presence)
  
  return (
    <>
      <div className="flex flex-row justify-center pt-4">
        <span>Eleição em&nbsp;</span>
        <span className="font-semibold">{cityName}</span>
      </div>

      <div className="flex flex-row items-center justify-center space-x-4 m-4">
        <div className="flex flex-wrap justify-center p-2">
          <div className="shadow-xl stats m-2">
            <div className="stat w-64">
              <div className="stat-figure">
                <GrGroup />
              </div>
              <div className="stat-title">Total de Eleitores</div>
              <div className="stat-value text-lg">{displayVotingPopulation}</div>
              <div className="stat-desc">&nbsp;</div>
            </div>
          </div>

          <div className="shadow-xl stats m-2">
            <div className="stat w-64">
              <div className="stat-figure">
                <GrCheckboxSelected />
              </div>
              <div className="stat-title">Comparecimento</div>
              <div className="stat-value text-success text-lg">{displayPresence}</div>
              <div className="stat-desc text-success flex flex-row font-semibold">
                {`${presencePercent}%`}
              </div>
            </div>
          </div>

          <div className="shadow-xl stats m-2">
            <div className="stat w-64">
              <div className="stat-figure">
                <GrClear />
              </div>
              <div className="stat-title">Abstenção</div>
              <div className="stat-value text-error text-lg">{displayAbsence}</div>
              <div className="stat-desc text-error flex flex-row font-semibold">
                {`${absencePercent}%`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center pb-4">
      <span className="font-semibold">{totalCandidates}</span>
        <span>&nbsp;candidatos</span>
      </div>
    </>
  )
}
