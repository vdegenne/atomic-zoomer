

window.addEventListener('load', () => {
  const script = document.createElement('script')
  script.src = `chrome-extension://${chrome.runtime.id}/content.js`
  document.body.append(script)
})