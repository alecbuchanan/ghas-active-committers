# ghas-active-committers
A GitHub Action to provide a count and a list of unique active committers in your GitHub Organization(s) or Enterprise.

## Permissions

To generate a report for Organizations, you must use a Fine-Grained token with "Administration" organization permissions (read) against all of the orgs you are supplying. For more information, refer to the [GitHub API documentation](https://docs.github.com/en/enterprise-cloud@latest/rest/billing/billing?apiVersion=2022-11-28#get-github-advanced-security-active-committers-for-an-organization).

To generate a report for an Enterprise, you must use a Fine-Grained token with "Enterprise administration" business permissions (write) against the Enterprise you are supplying. For more information, refer to the [GitHub API documentation](https://docs.github.com/en/enterprise-cloud@latest/rest/enterprise-admin/billing?apiVersion=2022-11-28#get-github-advanced-security-active-committers-for-an-enterprise).

## Usage

To use this action, create a workflow file (e.g., `.github/workflows/ghas-active-committers.yml`) in your repository with the following content:

```yaml
name: Generate GHAS Unique Active Committers Report

on:
  workflow_dispatch:

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Generate GHAS Unique Active Committers Report
        uses: ./  # Uses an action in the root directory of your repository
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
          organization-slugs: 'org1,org2'  # Replace with your organization slugs
          enterprise-slug: 'enterprise'    # Replace with your enterprise slug (optional)
```

## Inputs
        
- `access-token` (required): The GitHub token to authenticate API requests.
- `organization-slugs` (optional): A single organization slug or a comma-separated list of organization slugs to get the unique active committers for.
- `enterprise-slug` (optional): The enterprise slug to get the unique active committers for.

## Outputs

The action generates CSV files containing the list of unique active committers for the specified organizations or enterprise. The CSV files are uploaded as artifacts.
