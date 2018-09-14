const src = {
  "Shared": "../src/shared",
  "Store": "../src/store",
  "Translations": "../src/translations",
  "Routes": "../src/routes"
}

const modules = {
  // Support React Native Web
  // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
  'react-native': 'react-native-web'
}

module.exports = {
  src,
  modules
};