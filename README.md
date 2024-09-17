# ghas-active-committers

[![CodeQL](https://github.com/alecbuchanan/ghas-active-committers/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/alecbuchanan/ghas-active-committers/actions/workflows/codeql-analysis.yml)

A GitHub Action to provide a count and a list of unique active committers in
your GitHub Organization or Enterprise.

## Permissions

To generate a report for an Organization, you must use a Fine-Grained token with
"Administration" organization permissions (read) against the org you are
supplying. For more information, refer to the
[GitHub API documentation](https://docs.github.com/en/enterprise-cloud@latest/rest/billing/billing?apiVersion=2022-11-28#get-github-advanced-security-active-committers-for-an-organization).

To generate a report for an Enterprise, you must use a Classic Personal Access
token with "manage_billing:enterprise" against the Enterprise you are supplying.
For more information, refer to the
[GitHub API documentation](https://docs.github.com/en/enterprise-cloud@latest/rest/enterprise-admin/billing?apiVersion=2022-11-28#get-github-advanced-security-active-committers-for-an-enterprise).

## Usage

To use this action, create a workflow file (e.g.,
`.github/workflows/ghas-active-committers.yml`) in your repository with the
following content:

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
        uses: alecbuchanan/ghas-active-committers@v1
        with:
          github-token: ${{ secrets.ACCESS_TOKEN }}
          organization-slug: 'org' # Replace with your organization slug (optional)
          enterprise-slug:
            'enterprise' # Replace with your enterprise slug
            # (optional)
```

## Inputs

- `github-token` (required): The GitHub token to authenticate API requests.
- `organization-slug` (optional): A single organization slug to get the unique
  active committers for.
- `enterprise-slug` (optional): The enterprise slug to get the unique active
  committers for.

## Outputs

The action generates CSV files containing the list of unique active committers
for the specified organization or enterprise. The CSV files are uploaded as
artifacts.
