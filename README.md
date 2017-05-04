# vmodal

<p>
  <a href="https://npmjs.com/package/vmodal"><img src="https://img.shields.io/npm/v/vmodal.svg?style=flat-square" alt="Latest Version on NPM"></a>
  <a href="https://npmjs.com/package/vmodal"><img src="https://img.shields.io/npm/dt/vmodal.svg?style=flat-square" alt="Total Downloads"></a>
</p>

>A Vue component for Bootstrap modals.

## Installation

```bash
npm install --save vmodal 
```

## Usage

See the included [example](example).

### JavaScript

```javascript
import Vue from 'vue'
import Modal from 'vmodal'

Vue.component('modal', Modal)

new Vue({
  el: '#app',

  methods: {
    showModal () {
      this.$refs.modal.show()
    }
  }
})
```

### HTML

```html
<div id="app">
  <modal ref="modal">
    <h5 slot="title">Modal title</h5>
    <div slot="body">
      <p>Modal body text goes here.</p>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-primary">Save changes</button>
      <button type="button" class="btn btn-secondary">Close</button>
    </div>
  </modal>

  <button @click="showModal" type="button" class="btn btn-primary">Show Modal</button>
</div>
```

## Api

### Methods

| Name | Description |
| :--- | :--- |
| __show__ | Show the modal. |
| __hide__ | Hide the modal. |
| __toggle__ | Toggle the modal. |

Example:

```javascript
this.$refs.modal.show()
```

### Props

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| __backdrop__ | Boolean&#124;String | `true` | Includes a modal-backdrop element or `static` for a backdrop which doesn't close the modal on click. |
| __close__ | Boolean | `true` | Show close &times; button. |
| __focus__ | Boolean | `true` | Puts the focus on the modal when initialized. |
| __keyboard__ | Boolean | `true` | Closes the modal when escape key is pressed. |
| __size__ | String | | Optional size: `sm` or `lg`. |
| __small__ | Boolean | | Equivalent to `size="sm"`. |
| __large__ | Boolean | | Equivalent to `size="lg"`. |
| __form__ | Object | | A [vform](https://github.com/cretueusebiu/vform) object. |

### Events

| Name | Attributes | Description |
| :--- | :--- | :--- |
| __submit__ | `(event)` | Emitted when the form is submitted. |
| __show__ | `(event)` | Emitted immediately when the `show` method is called. |
| __shown__ | `(event)` | Emitted when the modal has been made visible to the user. |
| __hide__ | `(event)` | Emitted immediately when the `hide` method has been called. |
| __hidden__ | `(event)` | Emitted when the modal has finished being hidden from the user. |

Example:

```javascript
this.$refs.modal.$on('shown', (e) => {
  console.log('Modal shown')
})
```

### Slots
| Name | Description |
| :--- | :--- |
| __title__ | The modal title. |
| __body__ | The modal body. |
| __footer__ | The modal footer. |
| __header__ | The modal header. |
| __content__ | The modal content. |
