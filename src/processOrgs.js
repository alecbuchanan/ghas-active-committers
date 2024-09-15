import { DefaultArtifactClient } from '@actions/artifact'
import { writeFileSync } from 'fs'
import { fetchOrgUsers } from './fetch-org-users'

export async function processOrgs(token, orgSlugs) {
  try {
    const artifactClient = DefaultArtifactClient()
    const rootDirectory = '.' // Root directory of the files
    const options = { continueOnError: false }

    const orgResults = await fetchOrgUsers(token, orgSlugs)
    const uniqueOrgUsers = new Set()

    // Combine and de-duplicate users from organizations
    for (const result of orgResults) {
      for (const user of result.users) {
        uniqueOrgUsers.add(user)
      }
    }

    const uniqueOrgUsersArray = Array.from(uniqueOrgUsers)

    // Convert to CSV
    const orgCsvContent = `organization_slugs: ${orgSlugs}\nusername\n${uniqueOrgUsersArray.join(
      '\n'
    )}\nTotal Unique Active Committers: ${uniqueOrgUsersArray.length}`
    const orgFilePath = 'org_unique_active_committers.csv'

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
