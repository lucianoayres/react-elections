export default function CandidateCards({ children: electionscards }) {
  return (
    <div className="flex flex-wrap p-2 justify-center">{electionscards}</div>
  )
}
