export async function fetchJSON(url: string) {
  const res = await fetch(url)
  if (res.status !== 200) {
    throw new Error(`Http Status error: ${res.status} (${res.statusText})`)
  }
  return await res.json()
}
