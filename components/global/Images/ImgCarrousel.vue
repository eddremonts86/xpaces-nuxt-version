<template>
  <Carousel
    :autoplay="autoplay"
    :wrap-around="wrapAround"
    :snap-align="snapAlign"
    :transition="transitionTime"
    :breakpoints="breakpoints"
    :items-to-show="itemsToShow"
  >
    <Slide v-for="(slide, index) in slices" :key="index">
      <div class="carousel__item">
        <v-img
          cover
          class="mx-auto rounded-lg"
          lazy-src="https://picsum.photos/id/11/100/60"
          max-width="500"
          min-height="230"
          :src="slide"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
        </v-img>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  type SnapAlign = 'start' | 'center-even' | 'center-odd' | 'end'

  defineProps({
    slices: {
      type: Array as PropType<string[]>,
      required: true,
    },
    wrapAround: {
      type: Boolean,
      default: false,
    },
    snapAlign: {
      type: String as PropType<SnapAlign>,
      default: 'center',
    },
    transitionTime: {
      type: Number,
      default: 300,
    },
    autoplay: {
      type: Number,
      default: 0,
    },
    itemsToShow: {
      type: Number,
      default: 1,
    },
    breakpoints: {
      type: Object,
      default: () => ({
        1024: {
          slidesPerPage: 3,
        },
      }),
    },
  })
</script>

<style lang="scss" sco>
  .carousel__item {
    min-height: 200px;
    width: 100%;
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel__slide {
    padding: 10px;
  }

  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 0px solid white;
  }
</style>
