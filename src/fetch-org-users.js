const { Octokit } = require('octokit')

async function fetchOrgUsers(token, orgSlugs) {
  const octokit = new Octokit({ auth: token })
  const orgs = orgSlugs.split(',').map(org => org.trim())
  const uniqueUsers = new Set()

  for (const org of orgs) {
    const users = await octokit.paginate(
      'GET /orgs/{org}/settings/billing/advanced-security',
      {
        org,
        per_page: 100,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      },
      pageResponse =>
        pageResponse.data.repositories.flatMap(repo =>
          repo.unique_active_committers_breakdown.map(user => user.user_login)
        )
    )

    for (const user of users) {
      uniqueUsers.add(user)
    }
  }

  return Array.from(uniqueUsers)
}

module.exports = { fetchOrgUsers }
