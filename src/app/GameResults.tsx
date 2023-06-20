import { useEffect, useRef, useState } from "react"
import GameButton, { Choice } from "./GameButton"

interface Props {
  userChoice: Choice
  setUserChoice: Function
  setTies: Function
  setLosses: Function
  setWins: Function
}

const choices: Choice[] = ["paper", "rock", "lizard", "spock", "scissors"]
function randomChoice(): Choice {
  return (["rock", "paper", "scissors"] as const)[Math.floor(Math.random() * 3)]
}

const getChoiceIndex = (choice: Choice): number => choices.indexOf(choice)

type GameResult = "win" | "loss" | "tie"

// https://stackoverflow.com/questions/22623331/rock-paper-scissors-lizard-spock-in-javascript
function didWin(userChoice: number, computerChoice: number): GameResult {
  let dif = userChoice - computerChoice
  if (dif < 0) {
    dif += choices.length
  }
  while (dif > 2) {
    dif -= 2
  }

  const result: GameResult[] = ["tie", "loss", "win"]
  return result[dif]
}

function getResultText(gameResult: GameResult) {
  return {
    win: "YOU WIN",
    loss: "YOU LOSE",
    tie: "TIE",
  }[gameResult]
}

export default function GameResults({ userChoice, setUserChoice, setTies, setWins, setLosses }: Props) {
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [isAnimationOver, setIfAnimationOver] = useState<boolean>(false)
  const [gameResult, setGameResult] = useState<GameResult | null>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  const isMobile = window.innerWidth < 1000

  useEffect(() => {
    const constWrapper = wrapper.current
    if (!constWrapper) return

    setTimeout(() => {
      const choice = randomChoice()
      setComputerChoice(choice)
      setGameResult(didWin(getChoiceIndex(userChoice), getChoiceIndex(choice)))

      if (isMobile) {
        setIfAnimationOver(true)
        return
      }

      constWrapper.style.transition = "gap 500ms ease 500ms"
      constWrapper.style.gap = `${128 * 2 + 192}px` // Current gap + ".play-again" width

      setTimeout(() => {
        constWrapper.style.gap = ""
        constWrapper.style.transition = ""
        setIfAnimationOver(true)
      }, 1000)
    }, 2000)
  }, [])

  useEffect(() => {
    if (gameResult == "tie") setTies((t: number) => t + 1)
    else if (gameResult == "win") setWins((w: number) => w + 1)
    else if (gameResult == "loss") setLosses((l: number) => l + 1)
  }, [gameResult])

  return isMobile ? (
    <>
      <div className="game-results" ref={wrapper}>
        <div>
          <GameButton type={userChoice} />
          <h2>YOU PICKED</h2>
        </div>

        <div>
          {computerChoice ? <GameButton type={computerChoice} /> : <div className="choice-slot" />}
          <h2>THE HOUSE PICKED</h2>
        </div>
      </div>

      {isAnimationOver && gameResult && (
        <div className="play-again">
          <h2>{getResultText(gameResult)}</h2>
          <button onClick={() => setUserChoice(null)}>PLAY AGAIN</button>
        </div>
      )}
    </>
  ) : (
    <div className="game-results" ref={wrapper}>
      <div>
        <h2>YOU PICKED</h2>
        <GameButton type={userChoice} big />
      </div>

      {isAnimationOver && gameResult && (
        <div className="play-again">
          <h2>{getResultText(gameResult)}</h2>
          <button onClick={() => setUserChoice(null)}>PLAY AGAIN</button>
        </div>
      )}

      <div>
        <h2>THE HOUSE PICKED</h2>
        {computerChoice ? <GameButton type={computerChoice} big /> : <div className="choice-slot" />}
      </div>
    </div>
  )
}
