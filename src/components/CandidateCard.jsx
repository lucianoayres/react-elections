import { helperFormatNumber } from '../helpers/formatNumberHelpers'
import AnimateCounter from './AnimateCounter'
import AnimateProgressBar from './AnimateProgressBar'
import { Motion, spring } from '@serprex/react-motion'

export default function CandidateCard({
  id = null,
  name = null,
  username = null,
  votes = null,
  percent = null,
  place = null
}) {
  const displayVotes = helperFormatNumber(votes)
  let customStyleConfig = {}
  let progressColor = ''

  place === 1
    ? (progressColor = 'progress-success')
    : (progressColor = 'progress-error')

  place === 1
    ? (customStyleConfig = {
        text: 'Eleito',
        color: 'success',
        avatarRing: 'ring-success',
        badge: 'badge-success',
        animation: 'animate-bounce'
      })
    : (customStyleConfig = {
        text: 'Não Eleito',
        color: 'error',
        avatarRing: 'ring-error',
        badge: 'badge-error',
        animation: 'animate-none'
      })

  return (
    <Motion
      defaultStyle={{ interpolationValue: 0 }}
      style={{
        interpolationValue: spring(1, {
          stiffness: 60,
          damping: 15,
          precision: 0.01
        })
      }}
    >
      {(value) => (
        <div className="card card-side text-center w-64 h-64 shadow-xl m-2"
        style={{ opacity: value.interpolationValue }}
        >
          <div
            className="card-body"
          >
            <div className="flex flex-wrap">
              <div className="avatar justify-start">
                <div
                  className={`mb-2 rounded-full w-20 h-20 ring ${customStyleConfig.avatarRing} ring-offset-base-100 ring-offset-2`}
                >
                  <img src={`img/${username}.png`} alt="1" />
                </div>
              </div>
              <div className="flex flex-grow justify-end pt-2">
                <div className="flex flex-col space-y-2">
                  <div
                    className={`stat-value text-sm text-${customStyleConfig.color} dark:text-${customStyleConfig.color}`}
                  >
                    <AnimateCounter initialValue={0} finalValue={percent} />%
                  </div>

                  <AnimateProgressBar
                    initialValue={0}
                    finalValue={percent}
                    color={progressColor}
                    fixedWidth="w-20"
                  />

                  <div className="text-xs">{displayVotes} votos</div>
                </div>
              </div>
            </div>

            <div className="justify-center card-actions pt-4">
              <span className={`text-xl font-semibold`}>{name}</span>
            </div>

            <div className="justify-center card-actions">
              <div
                className={`badge ${customStyleConfig.badge} badge-lg font-semibold text-sm ${customStyleConfig.animation}`}
              >
                {customStyleConfig.text}
              </div>
            </div>
          </div>
        </div>
      )}
    </Motion>
  )
}
