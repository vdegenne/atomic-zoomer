import { css, html, LitElement, nothing } from 'lit';
import {customElement, property, query, queryAsync, state} from 'lit/decorators.js'

@customElement('scrim-element')
export class ScrimElement extends LitElement {
  @state()
  private open = false

  @property()
  public type: 'image'|'video' = 'image'
  @property()
  public resource = '';

  get scrim () {
    return this.shadowRoot!.querySelector('#scrim')
  }

  static styles = css`
  :host {
    display: block;
    position: relative;
  }
  #scrim {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
  }
  #scrim[hide] {
    display: none;
  }
  #scrim img, #scrim video {
    max-height: 100%;
    max-width: 100%;
  }

  #signature {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px 10px;
    font-size: 0.9em;
    color: rgb(204 204 204);
    background: #80808021;
  }
  `

  constructor () {
    super()
    this.addEventListener('click', (e) => {
      // if (e.composedPath()[0] === this.scrim) {
        this.close()
      // }
    })
  }

  render() {
    const ipfs = !this.resource.startsWith('http')
    const src = ipfs ? `https://ipfs.atomichub.io/ipfs/${this.resource}` : this.resource;

    return html`
    <div id="scrim" ?hide=${this.open === false}>
    ${this.resource ? html`
      ${this.type === 'image' ? html`
        <img src="${src}">
      ` : html`
        <video src="${src}" autoplay loop></video>
      ` }
    ` : nothing}
      <a id="signature" href="https://github.com/vdegenne" target="_blank" @click=${(e) => { e.stopPropagation() }}>Support</a>
    </div>
    `
  }

  show (resource?: string, type?: 'image'|'video') {
    if (resource) {
      this.resource = resource;
      this.type = type || 'image';
    }
    this.open = true
    this.requestUpdate()
  }

  close () {
    this.open = false
    this.requestUpdate()
  }
}