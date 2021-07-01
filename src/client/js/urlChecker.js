function checkUrl(url_input) {
  const url = /^http:\/\/|^https:\/\//i
  return url.test(url_input);
}

export { checkUrl }