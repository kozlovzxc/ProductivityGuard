export function getHostname (url) {
  let link = document.createElement('a')
  link.href = url
  return link.hostname
}
