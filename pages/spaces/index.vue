<script setup lang="ts">
  definePageMeta({
    layout: 'hosting',
    middleware: 'auth',
  })

  import { ref } from 'vue'
  import { reservations } from '@/components/hosting/const/reservationsTypes'
  import { topics } from '@/components/hosting/const/topics'
  const auth0Store = useMyAuthStore()

  const helpTopics = ref(topics)
  const reservationsTypes = ref(reservations)
  const activeReservationsType = ref(reservationsTypes.value[0])
  const name = computed(() => auth0Store.user?.name)

  const updateReservationsType = (id: number) => {
    const type = reservationsTypes.value.filter(
      ({ id: reservationId }) => reservationId === id
    )
    activeReservationsType.value = type[0]
  }
</script>

<template>
  <v-container class="py-15">
    <h1>Welcome, {{ name }}!</h1>
    <section name="my-reservations" class="my-12">
      <v-row>
        <v-col cols="12" class="d-flex">
          <h1>Your reservations</h1>
          <v-spacer />
          <v-btn flat>All reservations(2)</v-btn>
        </v-col>
        <v-col cols="12" class="d-flex">
          <v-chip
            v-for="(reservation, index) in reservationsTypes"
            :key="index"
            class="mr-2"
            :variant="
              activeReservationsType.id === reservation.id
                ? 'tonal'
                : 'outlined'
            "
            @click="updateReservationsType(reservation.id)"
          >
            {{ reservation.name }} ({{ reservation.value }})
          </v-chip>
        </v-col>
        <v-col cols="12" class="d-flex">
          <div
            v-if="activeReservationsType.value <= 0"
            class="reservation-container"
          >
            <v-icon size="x-large" class="ma-3">mdi-information-outline</v-icon>
            <p>{{ activeReservationsType.emptyMessage }}</p>
          </div>
          <div v-else>
            <p>Reservations</p>
          </div>
        </v-col>
      </v-row>
    </section>

    <section name="We-are-here-to-help" class="my-12">
      <h1>We’re here to help</h1>
      <v-row class="pt-12">
        <v-col
          v-for="(topic, index) in helpTopics"
          :key="index"
          cols="12"
          md="5"
          class="d-flex info-container"
        >
          <div class="icon">
            <v-icon size="x-large">
              {{ topic.icon }}
            </v-icon>
          </div>
          <div class="content">
            <p class="title">
              {{ topic.title }}
            </p>
            <p>{{ topic.content }}</p>
          </div>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>
<style lang="scss" scoped>
  .info-container {
    padding: 1rem;
    margin: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    max-width: 400px;
    cursor: pointer;
    &:hover {
      background: #e0e0e080;
    }
    .icon {
      padding: 0 15px;
    }
    .content {
      font-size: 0.8rem;
      .title {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }
  .reservation-container {
    width: 100%;
    min-height: 20rem;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 12px;
    -box-pack: center;
  }
</style>
