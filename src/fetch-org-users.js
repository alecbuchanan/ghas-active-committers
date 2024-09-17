async function fetchOrgUsers(token, orgSlug) {
  const { Octokit } = await import('octokit') // Use dynamic import
  const octokit = new Octokit({ auth: token })

  const users = await octokit.paginate(
    'GET /orgs/{org}/settings/billing/advanced-security',
    {
      org: orgSlug,
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    },
    pageResponse =>
      pageResponse.data.flatMap(repo =>
        repo.advanced_security_committers_breakdown.map(user => user.user_login)
      )
  )

  return Array.from(new Set(users))
}

module.exports = { fetchOrgUsers }
