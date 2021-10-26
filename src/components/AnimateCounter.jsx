import { Motion, spring } from '@serprex/react-motion'

export default function InterpolateNumericValue({
  initialValue = 0,
  finalValue = 100,
  precision = 0.01
}) {
  return (
    <Motion
      defaultStyle={{ interpolationValue: initialValue }}
      style={{
        interpolationValue: spring(finalValue, { precision })
      }}
    >
      {(value) => <>{value.interpolationValue.toFixed(2)}</>}
    </Motion>
  )
}
