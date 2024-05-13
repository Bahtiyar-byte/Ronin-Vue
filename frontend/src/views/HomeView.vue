<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import {
  mdiAccount,
  mdiSendCheck,
  mdiBriefcase,
  mdiCalendarCheck,
  mdiInvoiceCheck,
} from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
// import SectionTitleBar from '@/components/SectionTitleBar.vue'
// import SectionHeroBar from '@/components/SectionHeroBar.vue'
// import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CurrentPipeline from "@/components/Pipelines/PipelineCard.vue";
import PipelineDisplayItem from "@/types/pipiline/PipelineDisplayItem";
import ActiveJobsTable from "@/components/Jobs/common/ActiveJobsTable.vue";
import AppTools from "@/components/common/tools/AppTools.vue";
import { RouteLocationRaw } from "vue-router";

// const titleStack = ref(['Admin', 'Dashboard'])

const currentPipelineItems = ref<PipelineDisplayItem[]>([]);

onMounted(() => {
  const fetchData = async () => {
    const { data: { count: users } } = await axios.get('/users/count');
    // const { data: { count: contacts } } = await axios.get('/contacts/count');
    const { data: { count: appointments } } = await axios.get('/appointments/count');
    const { data: { count: jobs } } = await axios.get('/jobs/count');
    const { data: { count: estimates } } = await axios.get('/estimates/count');
    // const { data: { count: trades } } = await axios.get('/trades/count');
    // const { data: { count: templates } } = await axios.get('/templates/count');
    // const { data: { count: documents } } = await axios.get('/documents/count');
    // const { data: { count: images } } = await axios.get('/images/count');
    // const { data: { count: roles } } = await axios.get('/roles/count');
    // const { data: { count: teams } } = await axios.get('/teams/count');
    const { data: { count: invoices } } = await axios.get('/invoices/count');

    const items = [];
    items.push(new PipelineDisplayItem(
      'Users',
      users,
      { name: 'Users' },
      mdiAccount
    ));
    items.push(new PipelineDisplayItem(
      'Appointments',
      appointments,
      { name: 'Appointments' },
      mdiSendCheck
    ));
    items.push(new PipelineDisplayItem(
      'Jobs',
      jobs,
      { name: 'Jobs' },
      mdiBriefcase
    ));
    items.push(new PipelineDisplayItem(
      'Estimates',
      estimates,
      { name: 'Estimates' },
      mdiCalendarCheck
    ));
    items.push(new PipelineDisplayItem(
      'Invoices',
      invoices,
      { name: 'Invoices' },
      mdiInvoiceCheck,
    ));
    currentPipelineItems.value = items;
  };
  fetchData();
})

interface InfoPanelItem
{
  to: RouteLocationRaw;
  title: string;
  icon: string;
}

const createActions = ref<InfoPanelItem[]>([
  {
    to: { name: 'NewUsers' },
    title: 'User',
    icon: mdiAccount,
  }
]);

const companyInfoItems = ref<InfoPanelItem[]>([
  {
    to: { name: 'Users' },
    title: 'Users',
    icon: mdiAccount,
  }
]);

</script>

<template>
  <SectionMain>
    <CurrentPipeline :pipeline-items="currentPipelineItems" title="Current pipeline" />
  </SectionMain>

  <SectionMain class="mb-4">
    <v-row>
      <v-col class="pt-0" cols="12" md="4">
        <ActiveJobsTable title="Active jobs" />
      </v-col>

      <v-col class="pt-0" cols="12" md="4">
        <AppTools title="Tools" />
      </v-col>

      <v-col class="pt-0" cols="12" md="4">
        <v-card title="Create">
          <v-card-text>
            <v-btn
              v-for="(createAction, key) in createActions"
              :key="`dashboard-create-panel-${key}`"
              :to="createAction.to"
              :prepend-icon="createAction.icon"
              :text="createAction.title"
            />
          </v-card-text>
        </v-card>


        <v-card class="mt-6"
                title="Company info"
        >
          <v-card-text>
            <v-btn
              v-for="(infoItem, key) in companyInfoItems"
              :key="`dashboard-info-panel-${key}`"
              :to="infoItem.to"
              :prepend-icon="infoItem.icon"
              :text="infoItem.title"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </SectionMain>

<!--  <SectionTitleBar :title-stack="titleStack" />-->
<!--  <SectionHeroBar>Dashboard</SectionHeroBar>-->
<!--  <SectionMain>-->
<!--    <p class="text-2xl text-pavitra-900">-->
<!--      Welcome, Admin-->
<!--    </p>-->
<!--  </SectionMain>-->
<!--  <SectionMain class="flex flex-wrap">-->
<!--    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6 w-full">-->

<!--      <a href="#/users">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.users"-->
<!--        label="Users"-->
<!--          /></a><a href="#/contacts">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.contacts"-->
<!--        label="Contacts"-->
<!--          /></a><a href="#/appointments">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.appointments"-->
<!--        label="Appointments"-->
<!--          /></a><a href="#/jobs">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.jobs"-->
<!--        label="Jobs"-->
<!--          /></a><a href="#/estimates">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.estimates"-->
<!--        label="Estimates"-->
<!--          /></a><a href="#/trades">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.trades"-->
<!--        label="Trades"-->
<!--          /></a><a href="#/templates">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.templates"-->
<!--        label="Templates"-->
<!--          /></a><a href="#/documents">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.documents"-->
<!--        label="Documents"-->
<!--          /></a><a href="#/images">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.images"-->
<!--        label="Images"-->
<!--          /></a><a href="#/roles">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.roles"-->
<!--        label="Roles"-->
<!--          /></a><a href="#/teams">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.teams"-->
<!--        label="Teams"-->
<!--          /></a><a href="#/invoices">-->
<!--        <CardBoxWidget-->
<!--        color="text-blue-500"-->
<!--        :icon="mdiInformation"-->
<!--        :number="counts.invoices"-->
<!--        label="Invoices"-->
<!--          /></a>-->

<!--    </div>-->
<!--  </SectionMain>-->
</template>
