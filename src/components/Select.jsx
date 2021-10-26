export default function Select({
  value = null,
  name = null,
  textLabel = null,
  data = [],
  onChange = null
}) {
// OBS: O Professor definiu os dados como 'options = [{ id: '1', description: 'Opção 1'}]
  function handleChange(event){
    if(onChange){
      onChange(event)
    }
  }
  return (
    <span>
      <label className="label flex flex-row justify-center">
        <span className="label-text dark:text-white">{textLabel}</span> 
      </label> 
      <select
          className='select w-64 select-bordered'
          value={value}
          name={name}
          onChange={handleChange}
        >
          {data.map((item) => {
            const { id, name } = item;
              return (
              <option key={id} value={name}>
                {name}
              </option>
            )
          })}
        </select>
      </span>
  )
}
