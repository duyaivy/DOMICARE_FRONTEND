export const formatCurrentcy = (num: number) => {
  return new Intl.NumberFormat('de-DE').format(Number(num.toFixed(2)))
}
export const formatNumberSold = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2
  }).format(num)
}
