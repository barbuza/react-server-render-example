if (process.env.NODE_ENV == "production") {
  module.exports = {
    info: function() {},
    debug: function() {},
    warn: function() {
      if (console && console.warn) {
        console.warn.apply(console, arguments);
      }
    },
    error: function() {
      if (console && console.error) {
        console.error.apply(console, arguments);
      }
    }
  };
} else {
  module.exports = {
    info: function() {
      console.info.apply(console, arguments);
    },
    debug: function() {
      console.debug.apply(console, arguments);
    },
    warn: function() {
      console.warn.apply(console, arguments);
    },
    error: function() {
      console.error.apply(console, arguments);
    }
  };
}
