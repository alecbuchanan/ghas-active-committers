import { Octokit } from 'octokit'

export async function fetchEnterpriseUsers(token, enterpriseSlug) {
  const octokit = new Octokit({ auth: token })
  const response = await octokit.paginate(
    'GET /enterprises/{enterprise}/settings/billing/advanced-security',
    {
      enterprise: enterpriseSlug,
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

  return Array.from(new Set(response))
}
