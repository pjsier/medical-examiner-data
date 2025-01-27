import React from "react"
import { graphql } from "gatsby"

import CommunityAreaMap from "../components/communityareamap"
import EmbedCredit from "../components/embedcredit"
import getLastUpdatedString from "../utils/getlastupdatedstring"
import noLocationCount from "../utils/nolocationcount"
import getMapDates from "../utils/getmapdates"
import "../css/custom.css"


const MapPage = ({data}) => {
  const last_updated = getLastUpdatedString(data.build_time.nodes[0].buildTime)
  const dates = getMapDates(last_updated)
  const no_location_recent = noLocationCount(data.case_data.nodes, dates.startDate)

  return (
    <>
      <h4 style={{textAlign: "center"}}>
        Recent per capita COVID-19 deaths by Chicago neighborhood ({dates.startDateFormatted}-{dates.endDateFormatted})
      </h4>
      <CommunityAreaMap
        title={`Recent per capita COVID-19 deaths by Chicago neighborhood`}
        geojson={data.community_areas.nodes[1]}
        no_location={no_location_recent}
        colors={['#FFFFD4', '#C83302']}
        last_updated={last_updated}
        embed={true}
        zoom={9.6}
        height='350px'
      />
      <EmbedCredit
        last_updated={last_updated}
      />
    </>
  )
}

export default MapPage

export const query = graphql`
  query MapWithTextRecentQuery {
    community_areas:allGeoJson {
      nodes {
        features {
          type
          geometry {
            type
            coordinates
          }
          properties {
            community
            population
            value
          }
        }
      }
    },
    case_data:allCasesJson {
      nodes {
        death_date
      }
    },
    build_time:allSiteBuildMetadata {
      nodes {
        buildTime
      }
    }
  }
`
