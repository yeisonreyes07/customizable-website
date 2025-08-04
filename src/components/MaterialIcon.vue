<template>
  <svg 
    :class="iconClass"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script>
export default {
  name: 'MaterialIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  computed: {
    iconClass() {
      return `icon-${this.size}`
    },
    iconPath() {
      return this.icon
    }
  }
}
</script>

<style scoped>
.icon-sm {
  width: 1rem;
  height: 1rem;
}

.icon-md {
  width: 1.25rem;
  height: 1.25rem;
}

.icon-lg {
  width: 1.5rem;
  height: 1.5rem;
}

.icon-xl {
  width: 2rem;
  height: 2rem;
}
</style>