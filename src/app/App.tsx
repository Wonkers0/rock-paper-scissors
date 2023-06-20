import { useEffect, useState } from "react"
import Game from "./Game"
import Header from "./Header"
import RulesModal from "./RulesModal"
import { Choice } from "./GameButton"
import GameResults from "./GameResults"

export default function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(true)
  const [userChoice, setUserChoice] = useState<Choice | null>(null)
  const [isMobile, setIfIsMobile] = useState<boolean>(window.innerWidth <= 600)
  const [ties, setTies] = useState<number>(parseInt(window.localStorage.ties) || 0)
  const [wins, setWins] = useState<number>(parseInt(window.localStorage.wins) || 0)
  const [losses, setLosses] = useState<number>(parseInt(window.localStorage.losses) || 0)

  window.localStorage.ties = ties
  window.localStorage.wins = wins
  window.localStorage.losses = losses

  useEffect(() => {
    window.addEventListener("resize", () => setIfIsMobile(window.innerWidth <= 600))
  }, [])

  return (
    <>
      <Header ties={ties} losses={losses} wins={wins} />
      {userChoice == null ? (
        <Game userHasPicked={userChoice != null} setUserChoiceProp={setUserChoice} />
      ) : (
        <GameResults
          userChoice={userChoice}
          setUserChoice={setUserChoice}
          setTies={setTies}
          setWins={setWins}
          setLosses={setLosses}
        />
      )}

      <button onClick={() => setModalOpen(true)} className="rules">
        RULES
      </button>

      {modalOpen && (
        <>
          <RulesModal setModalOpen={setModalOpen} isMobile={isMobile} />
          <div className="fade" />
        </>
      )}
    </>
  )
}
