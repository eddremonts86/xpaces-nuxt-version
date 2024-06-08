<script lang="ts" setup>
  interface Props {
    header: string
    size?: 'big' | 'medium' | 'small'
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'big',
  })

  const cssClass: { [key: string]: string } = {
    small: 'item-header-small',
    medium: 'item-header-medium',
    big: 'item-header',
  }

  const textClass = computed(() => {
    return cssClass[props.size]
  })
</script>

<template>
  <p :class="textClass">
    {{ props.header }}
  </p>
</template>

<style lang="scss" scope>
  .item-header {
    color: #000;
    font-size: 4rem;
    line-height: 5.5rem;
    margin-bottom: 0;
    font-weight: 600;
  }
  @media screen and (max-width: 768px) {
    .item-header {
      padding: 0 12px;
      font-size: 3rem;
    }
  }
</style>
