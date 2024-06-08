<template>
  <div>
    <Carousel
      id="gallery"
      v-model="currentSlide"
      :autoplay="autoplay"
      :wrap-around="wrapAround"
      :snap-align="snapAlign"
      :transition="transitionTime"
      :breakpoints="breakpoints"
      :items-to-show="itemsToShow"
    >
      <Slide v-for="(slide, index) in slices" :key="index">
        <div class="carousel__item w-100">
          <v-img
            cover
            class="mx-auto rounded-lg"
            lazy-src="https://picsum.photos/id/11/100/60"
            max-width="1200"
            min-height="200"
            aspect-ratio="1.5"
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
    </Carousel>

    <Carousel
      id="thumbnails"
      ref="carousel"
      v-model="currentSlide"
      :items-to-show="7"
      :wrap-around="true"
      class="my-6"
    >
      <Slide v-for="(slideMini, index) in slices" :key="index">
        <div class="carousel__item mini" @click="currentSlide = index">
          <v-img
            cover
            class="mx-auto rounded-lg"
            lazy-src="https://picsum.photos/id/11/100/60"
            max-width="420"
            min-height="150"
            aspect-ratio="1.5"
            :src="slideMini"
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
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'
  import { Carousel, Pagination, Slide } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  type SnapAlign = 'start' | 'center-even' | 'center-odd' | 'end'
  const currentSlide = ref(0)

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
    &.mini {
      cursor: pointer;
      padding: 10px;
    }
  }
  #thumbnails {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 16px 16px;
    background: #e5e5e57a;
    padding: 10px;
    border-radius: 20px;
    .carousel__prev,
    .carousel__next {
      box-sizing: content-box;
      border: 0px solid white;
    }
    .carousel__slide {
      padding: 5px;
    }

    .carousel__viewport {
      perspective: 2000px;
    }
    .carousel__track {
      transform-style: preserve-3d;
    }
    .carousel__slide--sliding {
      transition: 0.5s;
    }

    .carousel__slide {
      opacity: 0.9;
      transform: rotateY(-20deg) scale(0.9);
    }

    .carousel__slide--active ~ .carousel__slide {
      transform: rotateY(20deg) scale(0.9);
    }
    .carousel__slide--prev {
      opacity: 1;
      transform: rotateY(-10deg) scale(0.95);
    }

    .carousel__slide--next {
      opacity: 1;
      transform: rotateY(10deg) scale(0.95);
    }

    .carousel__slide--active {
      opacity: 1;
      transform: rotateY(0) scale(1.1);
      border-radius: 15px;
    }
  }
</style>
