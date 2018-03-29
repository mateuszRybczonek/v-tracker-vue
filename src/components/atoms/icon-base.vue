<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    role="presentation"
  >
    <g :fill="iconColor">
      <slot/>
    </g>
  </svg>
</template>

<script>
  export default {
    props: {
      width: {
        type: [Number, String],
        default: 76
      },
      height: {
        type: [Number, String],
        default: 76
      },
      iconColor: {
        type: String,
        default: 'currentColor'
      },
      viewBox: {
        type: String,
        default: '0 0 76 76'
      }
    }
  }
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
