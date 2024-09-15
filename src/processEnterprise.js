const { DefaultArtifactClient } = require('@actions/artifact')
const { writeFileSync } = require('fs')
const { fetchEnterpriseUsers } = require('./fetch-enterprise-users')

async function processEnterprise(token, enterpriseSlug) {
  try {
    const artifactClient = DefaultArtifactClient()
    const rootDirectory = '.' // Root directory of the files
    const options = { continueOnError: false }

    const users = await fetchEnterpriseUsers(token, enterpriseSlug)
    const uniqueEnterpriseUsers = new Set(users)

    const uniqueEnterpriseUsersArray = Array.from(uniqueEnterpriseUsers)

    // Convert to CSV
    const enterpriseCsvContent = `enterprise_slug: ${enterpriseSlug}\nusername\n${uniqueEnterpriseUsersArray.join(
      '\n'
    )}\nTotal Unique Active Committers: ${uniqueEnterpriseUsersArray.length}`
    const enterpriseFilePath = `${enterpriseSlug}_unique_users.csv`

    // Write CSV to file
    writeFileSync(enterpriseFilePath, enterpriseCsvContent)

    // Upload artifact
    await artifactClient.uploadArtifact(
      'enterprise-unique-users',
      [enterpriseFilePath],
      rootDirectory,
      options
    )
  } catch (error) {
    console.error('Error processing enterprise:', error)
    throw error
  }
}

module.exports = { processEnterprise }
