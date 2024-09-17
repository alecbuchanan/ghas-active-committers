const { DefaultArtifactClient } = require('@actions/artifact')
const { writeFileSync } = require('fs')
const { fetchEnterpriseUsers } = require('./fetch-enterprise-users')

async function processEnterprise(token, enterpriseSlug) {
  try {
    const artifactClient = new DefaultArtifactClient()
    const rootDirectory = '.' // Root directory of the files
    const options = { continueOnError: false }

    const entUsers = await fetchEnterpriseUsers(token, enterpriseSlug)
    const distinctEntUsers = new Set(entUsers)

    const uniqueEntUsersArray = Array.from(distinctEntUsers)

    // Convert to CSV
    const enterpriseCsvContent = `enterprise_slug: ${enterpriseSlug}\n${uniqueEntUsersArray.join(
      '\n'
    )}\nTotal Unique Active Committers: ${uniqueEntUsersArray.length}`
    const entFilePath = `${enterpriseSlug}_active_committers.csv`

    // Write CSV to file
    writeFileSync(entFilePath, enterpriseCsvContent)

    // Upload artifact
    await artifactClient.uploadArtifact(
      'enterprise-unique-users',
      [entFilePath],
      rootDirectory,
      options
    )
  } catch (error) {
    console.error('Error processing enterprise:', error)
    throw error
  }
}

module.exports = { processEnterprise }
