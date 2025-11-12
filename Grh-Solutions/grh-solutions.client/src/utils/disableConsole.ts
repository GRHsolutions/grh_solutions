export const disableConsoleLogs = (disable = true) => {
  if (disable) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
};