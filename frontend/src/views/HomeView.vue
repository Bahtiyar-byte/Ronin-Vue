<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios';
import {
  mdiInformation,
} from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'

const titleStack = ref(['Admin', 'Dashboard'])

const counts = reactive({
  users: 0,contacts: 0,appointments: 0,jobs: 0,estimates: 0,trades: 0,templates: 0,documents: 0,images: 0,roles: 0,teams: 0,invoices: 0,
})

onMounted(() => {
  const fetchData = async () => {
    const { data: { count: users } } = await axios.get('/users/count');
    const { data: { count: contacts } } = await axios.get('/contacts/count');
    const { data: { count: appointments } } = await axios.get('/appointments/count');
    const { data: { count: jobs } } = await axios.get('/jobs/count');
    const { data: { count: estimates } } = await axios.get('/estimates/count');
    const { data: { count: trades } } = await axios.get('/trades/count');
    const { data: { count: templates } } = await axios.get('/templates/count');
    const { data: { count: documents } } = await axios.get('/documents/count');
    const { data: { count: images } } = await axios.get('/images/count');
    const { data: { count: roles } } = await axios.get('/roles/count');
    const { data: { count: teams } } = await axios.get('/teams/count');
    const { data: { count: invoices } } = await axios.get('/invoices/count');

    counts.users = users;
    counts.contacts = contacts;
    counts.appointments = appointments;
    counts.jobs = jobs;
    counts.estimates = estimates;
    counts.trades = trades;
    counts.templates = templates;
    counts.documents = documents;
    counts.images = images;
    counts.roles = roles;
    counts.teams = teams;
    counts.invoices = invoices;

  };
  fetchData();
})

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Dashboard</SectionHeroBar>
  <SectionMain>
    <p class="text-2xl text-pavitra-900">
      Welcome, Admin
    </p>
  </SectionMain>
  <SectionMain class="flex flex-wrap">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6 w-full">

      <a href="#/users">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.users"
        label="Users"
          /></a><a href="#/contacts">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.contacts"
        label="Contacts"
          /></a><a href="#/appointments">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.appointments"
        label="Appointments"
          /></a><a href="#/jobs">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.jobs"
        label="Jobs"
          /></a><a href="#/estimates">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.estimates"
        label="Estimates"
          /></a><a href="#/trades">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.trades"
        label="Trades"
          /></a><a href="#/templates">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.templates"
        label="Templates"
          /></a><a href="#/documents">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.documents"
        label="Documents"
          /></a><a href="#/images">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.images"
        label="Images"
          /></a><a href="#/roles">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.roles"
        label="Roles"
          /></a><a href="#/teams">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.teams"
        label="Teams"
          /></a><a href="#/invoices">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.invoices"
        label="Invoices"
          /></a>

    </div>
  </SectionMain>
</template>
