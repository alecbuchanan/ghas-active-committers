const core = require('@actions/core')
const { processOrgs } = require('./processOrgs')
const { processEnterprise } = require('./processEnterprise')

async function run() {
  try {
    const token = core.getInput('access-token', { required: true })
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

module.exports = { run }
