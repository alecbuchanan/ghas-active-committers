const { DefaultArtifactClient } = require('@actions/artifact')
const { writeFileSync } = require('fs')
const { fetchOrgUsers } = require('./fetch-org-users')

async function processOrg(token, orgSlug) {
  try {
    const artifactClient = new DefaultArtifactClient()
    const rootDirectory = '.' // Root directory of the files
    const options = { continueOnError: false }

    const orgUsers = await fetchOrgUsers(token, orgSlug)
    const distinctOrgUsers = new Set(orgUsers)

    const uniqueOrgUsersArray = Array.from(distinctOrgUsers)

    // Convert to CSV
    const orgCsvContent = `organization_slug: ${orgSlug}\n${uniqueOrgUsersArray.join(
      '\n'
    )}\nTotal Unique Active Committers: ${uniqueOrgUsersArray.length}`
    const orgFilePath = `${orgSlug}_active_committers.csv`

    // Write CSV to file
    writeFileSync(orgFilePath, orgCsvContent)

    // Upload artifact
    await artifactClient.uploadArtifact(
      'org-unique-active-committers',
      [orgFilePath],
      rootDirectory,
      options
    )
  } catch (error) {
    console.error('Error processing organizations:', error)
    throw error
  }
}

module.exports = { processOrg }
