import { Controller } from "@hotwired/stimulus"

const DURATION = 1400

export default class extends Controller {
  connect() {
    this.frame = null
    this.cancel = this.cancel.bind(this)
    this.onKeydown = this.onKeydown.bind(this)
  }

  disconnect() {
    this.stop()
  }

  scroll(event) {
    const target = document.querySelector(this.element.getAttribute("href"))
    if (!target) return

    event.preventDefault()
    this.stop()

    const startY = window.scrollY
    const distance = target.getBoundingClientRect().top + startY
    const startTime = performance.now()

    history.pushState(null, "", this.element.getAttribute("href"))
    window.addEventListener("wheel", this.cancel, { passive: true })
    window.addEventListener("touchstart", this.cancel, { passive: true })
    window.addEventListener("keydown", this.onKeydown)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, distance)
      this.finish(target)
      return
    }

    const animate = (now) => {
      const progress = Math.min((now - startTime) / DURATION, 1)
      const eased = progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2

      window.scrollTo(0, startY + distance * eased)

      if (progress < 1) {
        this.frame = requestAnimationFrame(animate)
      } else {
        this.finish(target)
      }
    }

    this.frame = requestAnimationFrame(animate)
  }

  onKeydown(event) {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
      this.cancel()
    }
  }

  cancel() {
    this.stop()
  }

  finish(target) {
    this.stop()
    target.focus({ preventScroll: true })
  }

  stop() {
    if (this.frame !== null) cancelAnimationFrame(this.frame)
    this.frame = null
    window.removeEventListener("wheel", this.cancel)
    window.removeEventListener("touchstart", this.cancel)
    window.removeEventListener("keydown", this.onKeydown)
  }
}
