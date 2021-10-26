import { Motion, spring } from '@serprex/react-motion'

export default function AnimateCounter({
  initialValue = 0,
  finalValue = 100,
  precision = 0.01,
  color = 'progress-success',
  fixedWidth = ''
}) {
  return (
    <Motion
      defaultStyle={{ interpolationValue: initialValue }}
      style={{
        interpolationValue: spring(finalValue, { precision })
      }}
    >
      {(value) => (
        <progress
          className={`progress ${color} ${fixedWidth}`}
          value={value.interpolationValue}
          max="100"
        ></progress>
      )}
    </Motion>
  )
}
