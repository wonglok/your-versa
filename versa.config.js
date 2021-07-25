let isDev = process.env.NODE_ENV === "development";

let show = "landing";
if (isDev) {
  show = "setup";
}

module.exports.show = show;

// your name of the metaverse.
module.exports.name = "Wong Lok";

//
