// keys.js
let key;

if (process.env.NODE_ENV === 'production') {
  key = await import("./keys_prod.js")
} else {
  key = await import("./keys_dev.js");
}

export default key;