import './scrim-element'
import { ScrimElement } from './scrim-element';

const scrim = document.createElement('scrim-element') as ScrimElement
// We add a scrim element to the page
document.body.appendChild(scrim)

// This loop is used to add a click event listener to all preview images on the page
setInterval(() => {
  const previews = [...document.querySelectorAll<HTMLImageElement>('img[src^="https://resizer"],source[src^="https://resizer"]')].filter(el => !el.onclick)
  previews.forEach(el => {
    let bindElement: HTMLElement = el;
    if (el.nodeName === 'SOURCE') {
      bindElement = el.parentElement!;
    }

    bindElement.onclick = function (e) {
      e.preventDefault()
      const resource = decodeURIComponent(el.src.match(/[ipfs|url]\=([^&]+)/)![1])
      if (e.ctrlKey) {
        window.open(!resource.startsWith('http') ? `https://ipfs.atomichub.io/ipfs/${resource}` : resource);
        return;
      }
      scrim.show(resource, el.nodeName === 'SOURCE' ? 'video' : 'image')
    }
  })
}, 1000);


// window.addEventListener('click', (e) => {
//   if (e.target instanceof Image && e.target.src.includes('resizer') && e.target.src.includes('ipfs')) {
//     e.preventDefault()
//     e.cancelBubble()
//     e.stopPropagation()
//     e.stopImmediatePropagation()
//     return false;
//   }
// })