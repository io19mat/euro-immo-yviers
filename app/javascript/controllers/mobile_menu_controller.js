import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "panel"]

  connect() {
    this.onWindowClick = this.onWindowClick.bind(this)
    this.onWindowKeydown = this.onWindowKeydown.bind(this)

    window.addEventListener("click", this.onWindowClick)
    window.addEventListener("keydown", this.onWindowKeydown)
  }

  disconnect() {
    window.removeEventListener("click", this.onWindowClick)
    window.removeEventListener("keydown", this.onWindowKeydown)
    document.body.classList.remove("overflow-hidden")
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.panelTarget.classList.remove("hidden")
    this.buttonTarget.setAttribute("aria-expanded", "true")
    this.buttonTarget.setAttribute("aria-label", "Close navigation")
    document.body.classList.add("overflow-hidden")
  }

  close() {
    if (!this.hasPanelTarget || !this.hasButtonTarget) return

    this.panelTarget.classList.add("hidden")
    this.buttonTarget.setAttribute("aria-expanded", "false")
    this.buttonTarget.setAttribute("aria-label", "Toggle navigation")
    document.body.classList.remove("overflow-hidden")
  }

  closeOnLink(event) {
    if (event.target.closest("a")) this.close()
  }

  onWindowClick(event) {
    if (this.isOpen && !this.element.contains(event.target)) this.close()
  }

  onWindowKeydown(event) {
    if (event.key === "Escape" && this.isOpen) {
      this.close()
      this.buttonTarget.focus()
    }
  }

  get isOpen() {
    return this.buttonTarget.getAttribute("aria-expanded") === "true"
  }
}
