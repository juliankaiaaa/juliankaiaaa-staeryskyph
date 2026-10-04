export default function Decor({
  src,
  alt = '',
  className = '',
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`decor ${className}`}
      aria-hidden="true"
    />
  )
}