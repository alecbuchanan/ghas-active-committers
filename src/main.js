import * as core from '@actions/core'
import { processOrgs } from './processOrgs'
import { processEnterprise } from './processEnterprise'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const token = core.getInput('github-token', { required: true })
    const orgSlugs = core.getInput('organization-slugs', { required: false })
    const enterpriseSlug = core.getInput('enterprise-slug', { required: false })

    if (!orgSlugs && !enterpriseSlug) {
      core.setFailed('No organization or enterprise slugs provided.')
      return
    }

    if (orgSlugs) {
      await processOrgs(token, orgSlugs)
    }

    if (enterpriseSlug) {
      await processEnterprise(token, enterpriseSlug)
    }

    console.log('Artifacts uploaded successfully.')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}
