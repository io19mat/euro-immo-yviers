import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.lastScrollY = window.scrollY
    this.frameRequested = false
    this.onScroll = this.onScroll.bind(this)

    window.addEventListener("scroll", this.onScroll, { passive: true })
    this.updateAppearance()
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll)
    if (this.frameRequested) cancelAnimationFrame(this.frameRequested)
  }

  onScroll() {
    if (this.frameRequested) return

    this.frameRequested = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 10) {
        this.element.classList.remove("site-navbar--hidden")
      } else if (currentScrollY > this.lastScrollY) {
        this.element.classList.add("site-navbar--hidden")
      } else if (currentScrollY < this.lastScrollY) {
        this.element.classList.remove("site-navbar--hidden")
      }

      this.lastScrollY = currentScrollY
      this.updateAppearance()
      this.frameRequested = null
    })
  }

  updateAppearance() {
    this.element.classList.toggle("site-navbar--scrolled", window.scrollY > 10)
  }
}
