
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const firebaseConfig = require(`./config/firebase-config.${process.env.GATSBY_FIREBASE_ENVIRONMENT}.json`)

module.exports = {
  siteMetadata: {
    title: `Responsible Leaders Gathering North America | 2020 Online Edition`,
    description: `Responsible Leaders Gathering North America | 2020 Online Edition`,
    url: `https://2020.gatheringnorthamerica.online`
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Responsible Leaders Gathering North America",
        short_name: "Responsible Leaders Gathering North America",
        start_url: "/",
        background_color: "#000",
        theme_color: "#00A6CE", // blue
        display: "minimal-ui",
        icon: "static/icon.png" // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-firebase-nl",
      options: {
        credential: firebaseConfig.serviceAccountKey,
        databaseURL: firebaseConfig.databaseURL,
        types: [
          {
            type: "Pages",
            path: "pages",
            map: node => {
              node.content = JSON.stringify(node.content);

              return node
            },
          },
          {
            type: "Translations",
            path: "translations",
          },
          {
            type: "Tags",
            path: "tags",
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    }
  ]
};
