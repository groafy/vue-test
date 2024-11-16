export const debounce = (fn: (...args: any[]) => any, wait: number) => {
  let timeout: number | null;
  const debounced = (...args: any) => {
    const context = this;
    clearTimeout(timeout as number);
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout as number);
    timeout = null;
  };

  return debounced;
};
