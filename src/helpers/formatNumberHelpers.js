export function helperFormatNumber(num){
  return new Intl.NumberFormat('pt-BR').format(num)
}

export function helperCalculatePercent(value, total){
  return (value * 100 / total).toFixed(2)
}

