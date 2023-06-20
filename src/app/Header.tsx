interface Props {
  ties: number
  losses: number
  wins: number
}

export default function Header({ties, losses, wins}: Props) {
  return (
    <header>
      <h1>
        ROCK
        <br />
        PAPER
        <br />
        SCISSORS
      </h1>

      <div className="score">
        <h2>SCORE</h2>
        <div>
          <h3>{ties} TIES</h3>
          <h3>{losses} LOSSES</h3>
          <h3>{wins} WINS</h3>
        </div>
      </div>
    </header>
  )
}
