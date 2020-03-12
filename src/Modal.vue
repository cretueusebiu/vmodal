<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document" :class="{
        'modal-sm': size === 'sm' || small,
        'modal-lg': size === 'lg' || large,
        'modal-xl': size === 'xl'
      }">
      <div class="modal-content">
        <slot name="content">
          <form @submit.prevent="$emit('submit', $event)" @keydown="onKeydown">
            <div class="modal-header">
              <slot name="header">
                <div class="modal-title">
                  <slot name="title"></slot>
                </div>
                <button v-if="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div v-if="$slots.footer" class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </form>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'modal',

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
      validator: val => ['sm', 'lg', 'xl'].includes(val)
    },

    small: Boolean,
    large: Boolean,

    form: Object,
    submit: Function
  },

  mounted () {
    this.$modal = $(this.$el)

    this.initializeModal()
  },

  beforeDestroy () {
    this.hide()
  },

  methods: {
    /**
     * Show the modal.
     *
     * @return {this}
     */
    show () {
      this.updateOptions()

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

    updateOptions () {
      const options = {
        focus: this.focus,
        backdrop: this.backdrop,
        keyboard: this.keyboard
      }

      const modal = this.$modal.data('bs.modal')

      Object.keys(options).forEach(key => {
        (modal.options || modal._config)[key] = options[key]
      })
    },

    onKeydown (e) {
      if (this.form) {
        this.form.errors.clear(e.target.name)
      }
    }
  }
}
</script>
