/*
  Splits text into one span per letter. Each letter gets an index so CSS can
  spread them outward from the centre when the parent is hovered.
*/
export default function SpreadText({ text }) {
  const letters = [...text]
  const middle = (letters.length - 1) / 2

  return (
    <span className="spread" aria-label={text}>
      {letters.map((letter, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{ '--i': index - middle }}
        >
          {letter === ' ' ? ' ' : letter}
        </span>
      ))}
    </span>
  )
}
