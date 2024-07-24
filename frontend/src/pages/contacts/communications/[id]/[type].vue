<script setup lang="ts">
import avatar8 from "@images/avatars/avatar-8.png";
import xls from "@images/icons/file/xls.png";
import pdf from "@images/icons/project-icons/pdf.png";
import aviato from "@images/logos/aviato.png";
import bitbank from "@images/logos/bitbank.png";
import zipcar from "@images/logos/zipcar.png";
import TimelineRectangle1 from "@images/pages/TimelineRectangle1.png";
import TimelineRectangle2 from "@images/pages/TimelineRectangle2.png";
import TimelineRectangle3 from "@images/pages/TimelineRectangle3.png";
import TimelineRectangle4 from "@images/pages/TimelineRectangle4.png";
import { useRoute } from "vue-router";

const albumImages = [
  TimelineRectangle1,
  TimelineRectangle2,
  TimelineRectangle3,
  TimelineRectangle4,
]

const communicationTypes = {
  email: 'tabler-mail-opened',
  chat: 'tabler-message-circle-2',
  sms: 'tabler-message',
  calls: 'tabler-phone',
}

const route = useRoute();
const communicationId = route.params.id;
const communicationType = route.params.type;


const earnings = [
  {
    avatar: zipcar,
    title: "Zipcar",
    subtitle: "Vuejs, React & HTML",
    amount: "$24,895.65",
    progress: "primary",
  },
  {
    avatar: bitbank,
    title: "Bitbank",
    subtitle: "Sketch, Figma & XD",
    amount: "$8,6500.20",
    progress: "info",
  },
  {
    avatar: aviato,
    title: "Aviato",
    subtitle: "HTML & Anguler",
    amount: "$1,2450.80",
    progress: "secondary",
  },
];
</script>

<template>
  <div class="my-6">
    <div>
      <h5 class="text-h5">Communication</h5>
    </div>
    <VTimeline
      align="start"
      line-inset="19"
      truncate-line="start"
      justify="center"
      :density="$vuetify.display.smAndDown ? 'compact' : 'default'"
      class="mt-4"
    >
      <!-- SECTION Timeline Item: Document -->
      <VTimelineItem fill-dot size="small">
        <template #opposite>
          <span class="app-timeline-meta"> 2 month's ago </span>
        </template>
        <template #icon>
          <div class="v-timeline-avatar-wrapper rounded-circle">
            <VAvatar size="32" color="primary" variant="tonal">
              <VIcon :icon="communicationTypes[communicationType]" size="20" />
            </VAvatar>
          </div>
        </template>
        <!-- 👉 Header -->
        <VCard class="mb-10 mt-n4">
          <VCardItem class="pb-4">
            <VCardTitle
              >Jane Williams</VCardTitle
            >
          </VCardItem>
          <VCardText>
            <!-- 👉 Content -->
            <p class="app-timeline-text mb-3">
              he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.
            </p>
            <div class="d-inline-flex align-items-center timeline-chip">
              <img :src="pdf" height="20" class="me-2" alt="img" />
              <span class="app-timeline-text font-weight-medium">
                documentation.pdf
              </span>
            </div>
          </VCardText>
        </VCard>
      </VTimelineItem>

      <VTimelineItem fill-dot size="small">
        <template #opposite>
          <span class="app-timeline-meta"> 2 month's ago </span>
        </template>
        <template #icon>
          <div class="v-timeline-avatar-wrapper rounded-circle">
            <VAvatar size="32" color="primary" variant="tonal">
              <VIcon :icon="communicationTypes[communicationType]" size="20" />
            </VAvatar>
          </div>
        </template>
        <!-- 👉 Header -->
        <VCard class="mb-10 mt-n4">
          <VCardItem class="pb-4">
            <VCardTitle
              >John Williams</VCardTitle
            >
          </VCardItem>
          <VCardText>
            <!-- 👉 Content -->
            <p class="app-timeline-text mb-3">
              he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.
            </p>
            <div class="d-inline-flex align-items-center timeline-chip">
              <img :src="pdf" height="20" class="me-2" alt="img" />
              <span class="app-timeline-text font-weight-medium">
                documentation.pdf
              </span>
            </div>
          </VCardText>
        </VCard>
      </VTimelineItem>

    </VTimeline>
  </div>
</template>

<style lang="scss">
.v-timeline-avatar-wrapper {
  background-color: rgb(var(--v-theme-surface));
}

.timeline-rating {
  .v-rating__item {
    .v-btn--icon {
      --v-btn-height: 28px;

      .v-btn__content {
        .v-icon {
          block-size: 28px !important;
          font-size: 28px !important;
          inline-size: 28px !important;
        }
      }
    }
  }
}
</style>
