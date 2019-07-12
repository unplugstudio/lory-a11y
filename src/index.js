import { lory } from 'lory.js'

export class LoryA11y {
  /**
   * Accessibility enhancements for Lory sliders
   * Based on https://www.w3.org/WAI/tutorials/carousels/
   */
  constructor(el, dataAttr = 'data-lory', hiddenClass = '_visually-hidden') {
    this.el = el
    this.hiddenClass = hiddenClass
    this.config = JSON.parse(el.getAttribute(dataAttr) || '{}')

    // Real slide count (before adding virtual slides)
    this.slideCount = el.querySelectorAll('.js_slides > *').length

    // Initialize lory, this will create all virtual slides
    this.loryInstance = lory(el, this.config)

    // Save a reference to all slides, including the virtual ones
    this.slides = this.el.querySelectorAll('.js_slides > *')

    // Initial render and event handlers for re-renders
    this.render()
    this.el.addEventListener('after.lory.slide', this.render.bind(this))

    this.isPlaying = false
    if (this.config.autoPlay) {
      // Set up autoplay and play/pause handlers if required
      this.isPlaying = true
      this.el.addEventListener('focusin', this.pause.bind(this))
      this.el.addEventListener('mouseenter', this.pause.bind(this))
      this.el.addEventListener('focusout', this.play.bind(this))
      this.el.addEventListener('mouseleave', this.play.bind(this))
      setInterval(this.autoPlay.bind(this), this.config.autoPlay)
    } else {
      // Otherwise, setup a live region for announcements
      this.addLiveRegion()
    }

    return this
  }

  autoPlay() {
    if (this.isPlaying) this.loryInstance.next()
  }

  pause() {
    this.isPlaying = false
  }

  play() {
    this.isPlaying = true
  }

  /** Create the live region for screen reader announcements */
  addLiveRegion() {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', true)
    liveRegion.classList.add(this.hiddenClass)
    this.el.appendChild(liveRegion)
    this.liveRegion = liveRegion
  }

  /** Render/update DOM elements according to the current state */
  render() {
    // Disable screen reader and focus access on all slides
    this.slides.forEach(slide => {
      slide.setAttribute('aria-hidden', true)
      slide.querySelectorAll('a, button, input').forEach(el => {
        el.setAttribute('tabindex', -1)
      })
    })

    // Enable screen reader and focus access on the active slide
    const activeSlide = this.el.querySelector('.js_slides > .active')
    activeSlide.setAttribute('aria-hidden', false)
    activeSlide.querySelectorAll('a, button, input').forEach(el => {
      el.removeAttribute('tabindex')
    })

    // Update the live region for screen reader announcements
    if (!this.liveRegion) return
    const activeIndex = this.loryInstance.returnIndex()
    this.liveRegion.textContent = `Item ${activeIndex + 1} of ${
      this.slideCount
    }`
  }
}

/**
 * Initialize Lory instances with added accessibility features
 */
export function initLory() {
  const lorySliders = document.querySelectorAll('[data-lory]')
  ;[...lorySliders].forEach(el => {
    el.lory = new LoryA11y(el)
  })
}
