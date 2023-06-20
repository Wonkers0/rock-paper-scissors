import { useRef } from "react"
import GameButton, { Choice } from "./GameButton"

interface Props {
  setUserChoiceProp: Function
  userHasPicked: boolean
}

export default function Game({ userHasPicked, setUserChoiceProp }: Props) {
  const wrapper = useRef<HTMLDivElement>(null)

  const setUserChoice = (choice: Choice) => {
    if (!wrapper.current) return

    wrapper.current.classList.add("hidden")
    setTimeout(() => setUserChoiceProp(choice), 500) // Wait for fade animation to finish
  }

  return (
    <main ref={wrapper} className={`triangle ${userHasPicked ? "hidden" : ""}`}>
      <img src="/images/bg-triangle.svg" />

      <GameButton type="rock" setUserChoice={setUserChoice} />
      <GameButton type="paper" setUserChoice={setUserChoice} />
      <GameButton type="scissors" setUserChoice={setUserChoice} />
      {/* <GameButton type="spock" setUserChoice={setUserChoice} /> */}
      {/* <GameButton type="lizard" setUserChoice={setUserChoice} /> */}
    </main>
  )
}
