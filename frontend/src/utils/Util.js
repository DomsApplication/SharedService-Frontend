const Util = (function () {
  return {
    isEmpty(v, allowBlank) {
      return v === null || v === undefined || (!allowBlank ? v === "" : false);
    },
    on(eventName, listener) {
      document.addEventListener(eventName, listener);
    },
    off(eventName, listener) {
      document.removeEventListener(eventName, listener);
    },
  };
})();

export default Util;
