const core = require('@actions/core')
const { processOrg } = require('./processOrg')
const { processEnterprise } = require('./processEnterprise')

async function run() {
  try {
    const token = core.getInput('github-token', { required: true })
    const orgSlug = core.getInput('organization-slug', { required: false })
    const enterpriseSlug = core.getInput('enterprise-slug', { required: false })

    if (!orgSlug && !enterpriseSlug) {
      core.setFailed('No organization or enterprise slug provided.')
      return
    }

    if (orgSlug) {
      await processOrg(token, orgSlug)
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
