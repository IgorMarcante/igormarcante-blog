require('dotenv').config();
const queries = require('./src/utils/algolia_queries')

module.exports = {
    siteMetadata: {
        title: `Igor Marcante`,
        position: `Full-Stack Developer`,
        description: `Um blog sobre desenvolvimento em geral e outras coisas legais.`,
        author: `@igormarcante`,
        siteUrl: `https://igormarcante.netlify.app`,
    },
    plugins: [
        `gatsby-plugin-transition-link`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        // needs to be the first to work with gatsby-remark-images
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `uploads`,
                path: `${__dirname}/static/assets/img`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/posts`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-relative-images",
                        options: {
                            name: "uploads"
                        }
                    },
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 960,
                            linkImagesToOriginal: false
                        }
                    },
                    `gatsby-remark-lazy-load`,
                    `gatsby-remark-prismjs`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-algolia-search`,
            options: {
              appId: process.env.GATSBY_ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_ADMIN_KEY,
              indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
              queries,
              chunkSize: 10000, // default: 1000
              enablePartialUpdates: true,
            },
          },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Igor Marcante`,
                short_name: `Igor Marcante`,
                start_url: `/`,
                background_color: `#16202c`,
                theme_color: `#16202c`,
                display: `minimal-ui`,
                icon: `static/assets/img/iconeIgor.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-sitemap`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify-cms`,
    ],
}