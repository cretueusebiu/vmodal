<template>
  <div class="modal fade">
    <div class="modal-dialog" role="document" :class="{
        'modal-sm': size === 'small',
        'modal-lg': size === 'large'
      }">
      <slot name="content">
        <div class="modal-content">
          <form @submit.prevent="$emit('submit', $event)">
            <slot name="header">
              <div class="modal-header">
                <slot name="title" class="modal-title"></slot>
                <button v-if="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
          </form>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    backdrop: {
      type: [Boolean, String],
      default: true
    },

    close: {
      type: Boolean,
      default: true
    },

    focus: {
      type: Boolean,
      default: true
    },

    keyboard: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      required: false,
      validator: val => ['sm', 'lg'].includes(val)
    },

    small: Boolean,
    large: Boolean,

    submit: Function
  },

  beforeMount () {
    this.addSlotClasses()
  },

  beforeUpdate () {
    this.addSlotClasses()
  },

  mounted () {
    this.$modal = $(this.$el)

    this.initializeModal()
  },

  beforeDestroy () {
    this.removeBackdrop()
  },

  methods: {
    /**
     * Show the modal.
     *
     * @return {this}
     */
    show () {
      this.$modal.modal('show')

      return this
    },

    /**
     * Hide the modal.
     *
     * @return {this}
     */
    hide () {
      this.$modal.modal('hide')

      return this
    },

    /**
     * Toggle the modal.
     *
     * @return {this}
     */
    toggle () {
      this.$modal.modal('toggle')

      return this
    },

    /**
     * Remove the modal backdrop.
     */
    removeBackdrop () {
      $('.modal-backdrop').remove()
    },

    /**
     * Initialize the Boostrap modal.
     */
    initializeModal () {
      if (!$.fn.modal) {
        throw new Error('[vmodal] Bootstrap is required.')
      }

      this.$modal.modal({
        show: false,
        focus: this.focus,
        backdrop: this.backdrop,
        keyboard: this.keyboard
      })

      this.$modal.on({
        'show.bs.modal': e => this.$emit('show', e),
        'shown.bs.modal': e => this.$emit('shown', e),
        'hide.bs.modal': e => this.$emit('hide', e),
        'hidden.bs.modal': e => this.$emit('hidden', e)
      })
    },

    /**
     * Add classes to slots.
     */
    addSlotClasses () {
      ['title', 'header', 'body', 'footer', 'content'].forEach(slot => {
        this.addSlotClass(this.$slots[slot], `modal-${slot}`)
      })
    },

    /**
     * Add a class to the given slot.
     *
     * @param {Object} slot
     * @param {String} className
     */
    addSlotClass (slot, className) {
      if (!slot || slot.length === 0) return

      const sClass = slot[0].data.staticClass || ''

      if (!sClass.includes(className)) {
        slot[0].data.staticClass = sClass.length > 0 ? `${sClass} ${className}` : className
      }
    }
  }
}
</script>
