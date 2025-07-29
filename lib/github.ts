import { Octokit } from '@octokit/rest'

export function createGithubClient(accessToken: string) {
  return new Octokit({
    auth: accessToken,
  })
}

export async function fetchUserRepositories(accessToken: string) {
  const octokit = createGithubClient(accessToken)
  
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: 'updated',
    per_page: 50,
  })

  return data.map(repo => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || '',
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    url: repo.html_url,
    updatedAt: repo.updated_at,
  }))
}

export async function fetchRepositoryFiles(accessToken: string, owner: string, repo: string, path = '') {
  const octokit = createGithubClient(accessToken)
  
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
  })

  return Array.isArray(data) ? data : [data]
}

export async function fetchFileContent(accessToken: string, owner: string, repo: string, path: string) {
  const octokit = createGithubClient(accessToken)
  
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
  })

  if ('content' in data) {
    return Buffer.from(data.content, 'base64').toString('utf8')
  }
  throw new Error('File not found or is a directory')
}