import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MixedBarChart from "../components/mixedbarchart"

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <MixedBarChart
        data={data}
      />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query PageQuery {
  cases_cv: allCases(
      filter: {
        death_date: {gte: "2020-01-01"},
        primarycause_linea: {regex: "/.*COVID.*/"}
      },
      sort: {
        fields: death_date,
        order: ASC
      }
    ) {
    nodes {
      id
      death_date(formatString: "YYYY-MM-DD")
      age
      race
      primarycause
      primarycause_linea
      gender
    }
  },
  cases_2020: allCases(
      filter: {
        death_date: {gte: "2020-03-16"},
      },
      sort: {
        fields: death_date,
        order: ASC
      }
    ) {
    nodes {
      id
      death_date(formatString: "YYYY-MM-DD")
      age
      race
      primarycause
      primarycause_linea
      gender
    }
  },
  cases_2019: allCases(
      filter: {
        death_date: {gte: "2019-03-16", lt: "2020-01-01"}
      },
      sort: {
        fields: death_date,
        order: ASC
      }
    ) {
    nodes {
      id
      death_date(formatString: "YYYY-MM-DD")
      age
      race
      primarycause
      primarycause_linea
      gender
    }
  }
}
`
