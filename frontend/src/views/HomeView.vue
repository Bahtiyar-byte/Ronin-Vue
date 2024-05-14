<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';

import SectionMain from '@/components/SectionMain.vue'
import CurrentPipeline from "@/components/Pipelines/PipelineCard.vue";
import PipelineDisplayItem from "@/types/pipiline/PipelineDisplayItem";
import ActiveJobsTable from "@/components/Jobs/common/ActiveJobsTable.vue";
import AppTools from "@/components/common/tools/AppTools.vue";
import { RouteLocationRaw } from "vue-router";

// const titleStack = ref(['Admin', 'Dashboard'])

const currentPipelineItems = ref<PipelineDisplayItem[]>([]);

onMounted(() => {
  const fetchData = async () => {
    const { data: { count: leadContacts } } = await axios.get('/contacts/count', {
      params: {
        stage: ['Lead'],
      }
    });

    const { data: { count: prospectContacts } } = await axios.get('/contacts/count', {
      params: {
        stage: ['Prospect'],
      }
    });

    const { data: { count: approvedJobs } } = await axios.get('/jobs/count', {
      params: {
        status: ['Approved'],
      }
    });

    const { data: { count: completedJobs } } = await axios.get('/jobs/count', {
      params: {
        status: ['Completed'],
      }
    });

    const { data: { count: invoicedJobs } } = await axios.get('/jobs/count', {
      params: {
        status: ['Invoiced'],
      }
    });

    const items = [];
    items.push(new PipelineDisplayItem(
      'Leads',
      leadContacts,
      { name: 'Contacts', query: { stage: 'Lead' } },
      'contact_emergency'
    ));
    items.push(new PipelineDisplayItem(
      'Prospects',
      prospectContacts,
      { name: 'Contacts' },
      'contact_mail'
    ));
    items.push(new PipelineDisplayItem(
      'Approved',
      approvedJobs,
      { name: 'Jobs' },
      'next_week'
    ));
    items.push(new PipelineDisplayItem(
      'Completed',
      completedJobs,
      { name: 'Jobs' },
      'work_alert'
    ));
    items.push(new PipelineDisplayItem(
      'Invoices',
      invoicedJobs,
      { name: 'Jobs' },
      'request_quote',
    ));

    currentPipelineItems.value = items;
  };
  fetchData();
})

interface InfoPanelItem
{
  to: RouteLocationRaw;
  title: string;
  icon?: string;
}

const createActions = ref<InfoPanelItem[]>([
  {
    to: { name: 'NewUsers' },
    title: 'User',
    // icon: mdiAccount,
  }
]);

const companyInfoItems = ref<InfoPanelItem[]>([
  {
    to: { name: 'Users' },
    title: 'Users',
    // icon: mdiAccount,
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
