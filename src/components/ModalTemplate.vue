<template>
  <div
    class="modal fade"
    id="Modal"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="size">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="title">{{ title }}</slot>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { size: String },
};
</script>

<style></style>
