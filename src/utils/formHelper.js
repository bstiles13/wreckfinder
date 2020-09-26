// There is a side effect with Semantic sidebars causing a double render / fade-in when conflicting focuses occur
// This workaround waits for Semantic to finish before calling a subsequent focus
export const delayAutoFocus = (input) => {
  setTimeout(() => {
    try {
      input && input.focus();
    } catch (err) { return err; }
  }, 1000);
};
