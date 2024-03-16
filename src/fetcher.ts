/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientError, ServerError } from './errors'
import { http } from './http'

function withContentType(method: string): Record<string, string> {
  if (http.isPost(method) || http.isPut(method)) {
    return { 'Content-Type': 'application/json' }
  } else {
    return {}
  }
}

function withAuthorization(accessToken?: string): Record<string, string> {
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` }
  } else {
    return {}
  }
}

function acceptLang(locale: string) {
  return locale === 'zh-CN' ? `${locale},zh;q=0.9` : 'en-US,en;q=0.9'
}

function withBody<T>(data: T | null | undefined): { body?: string } {
  if (data) {
    return { body: JSON.stringify(data) }
  } else {
    return {}
  }
}

interface FetcherOptions {
  basePath: string
  path: string
  method: string
  locale: string
  accessToken?: string
  body?: any
}

export async function fetcher({
  basePath,
  path,
  method,
  locale,
  accessToken,
  body,
}: FetcherOptions): Promise<any> {
  let data: any
  let error: Error | undefined

  try {
    const headers: HeadersInit = {
      ...withContentType(method),
      ...withAuthorization(accessToken),
      'Accept-Language': acceptLang(locale),
    }

    const options: RequestInit = {
      method,
      headers,
      ...withBody(body),
    }

    const res = await fetch(`/${basePath}/${path}`, options)

    if (res.ok) {
      data = await res.json()
    } else if (
      http.isBadRequest(res.status) ||
      http.isUnauthorized(res.status) ||
      http.isForbidden(res.status)
    ) {
      const { code, message } = await res.json()
      error = new ClientError(code, message, res.status)
    } else {
      error = new ServerError(res.statusText, res.status)
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = new ServerError(e.message)
    }
  }

  if (error) {
    throw error
  }

  return data
}
