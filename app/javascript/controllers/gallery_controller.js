import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["image", "lightbox", "lightboxImage", "caption", "closeButton"]

  connect() {
    this.currentIndex = 0
    this.lastTrigger = null
  }

  open(event) {
    this.lastTrigger = event.currentTarget
    this.currentIndex = this.imageTargets.indexOf(this.lastTrigger)
    this.updateLightbox()
    this.lightboxTarget.showModal()
    this.closeButtonTarget.focus()
  }

  close() {
    if (this.lightboxTarget.open) this.lightboxTarget.close()
  }

  closeOnBackdrop(event) {
    if (event.target === this.lightboxTarget) this.close()
  }

  restoreFocus() {
    this.lastTrigger?.focus()
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.imageTargets.length) % this.imageTargets.length
    this.updateLightbox()
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.imageTargets.length
    this.updateLightbox()
  }

  navigate(event) {
    if (!this.lightboxTarget.open) return

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      this.previous()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      this.next()
    }
  }

  updateLightbox() {
    const image = this.imageTargets[this.currentIndex]
    this.lightboxImageTarget.src = image.dataset.galleryImageUrl
    this.lightboxImageTarget.alt = image.dataset.galleryAlt
    this.captionTarget.textContent = image.dataset.galleryCaption
  }
}
