export function debounce(fn: Function, wait: number) {
  let timer: number
  return function (...args: any[]) {
    if (timer !== null) {
      window.clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn(...args)
    }, wait)
  }
}