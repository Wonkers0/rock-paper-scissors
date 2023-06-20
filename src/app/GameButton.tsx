export type Choice = "rock" | "paper" | "scissors" | "spock" | "lizard"

interface Props {
  type: Choice
  setUserChoice?: Function
  big?: boolean
}

export default function GameButton({ type, setUserChoice, big = false }: Props) {
  return (
    <button
      className={`game-button ${type} ${big ? "big" : ""}`}
      onClick={setUserChoice ? () => setUserChoice(type) : () => {}}
      disabled={!setUserChoice}
    >
      <div className="wrapper">
        <img src={`/images/icon-${type}.svg`} alt={type} />
      </div>
    </button>
  )
}
