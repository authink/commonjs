import { ClientError, ServerError } from './errors'
import { http } from './http'

function withContentType(method) {
  if (http.isPost(method) || http.isPut(method)) {
    return { 'Content-Type': 'application/json' }
  } else {
    return {}
  }
}

function withAuthorization(accessToken) {
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` }
  } else {
    return {}
  }
}

function acceptLang(locale) {
  return locale === 'zh-CN' ? `${locale},zh;q=0.9` : 'en-US,en;q=0.9'
}

function withBody(data) {
  if (data) {
    return { body: JSON.stringify(data) }
  } else {
    return {}
  }
}

export async function fetcher({
  basePath,
  path,
  method,
  locale,
  accessToken,
  body,
}) {
  let data, error
  try {
    const options = {
      method,
      headers: {
        ...withContentType(method),
        ...withAuthorization(accessToken),
        'Accept-Language': acceptLang(locale),
      },
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
  } catch ({ message }) {
    error = new ServerError(message)
  }

  if (error) {
    throw error
  }

  return data
}
