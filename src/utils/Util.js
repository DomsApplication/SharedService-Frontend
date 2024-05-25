const Util = (function () {
  return {
    on(eventName, listener) {
      document.addEventListener(eventName, listener);
    },
    off(eventName, listener) {
      document.removeEventListener(eventName, listener);
    },
  };
})();

export default Util;
