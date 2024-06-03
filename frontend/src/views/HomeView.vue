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
  users: 0,contacts: 0,addresses: 0,estimates: 0,jobs: 0,roles: 0,permissions: 0,templates: 0,trades: 0,invoices: 0,orders: 0,images: 0,documents: 0,emails: 0,chats: 0,appointments: 0,tasks: 0,contracts: 0,amendments: 0,milestones: 0,
})

onMounted(() => {
  const fetchData = async () => {
    const { data: { count: users } } = await axios.get('/users/count');
    const { data: { count: contacts } } = await axios.get('/contacts/count');
    const { data: { count: addresses } } = await axios.get('/addresses/count');
    const { data: { count: estimates } } = await axios.get('/estimates/count');
    const { data: { count: jobs } } = await axios.get('/jobs/count');
    const { data: { count: roles } } = await axios.get('/roles/count');
    const { data: { count: permissions } } = await axios.get('/permissions/count');
    const { data: { count: templates } } = await axios.get('/templates/count');
    const { data: { count: trades } } = await axios.get('/trades/count');
    const { data: { count: invoices } } = await axios.get('/invoices/count');
    const { data: { count: orders } } = await axios.get('/orders/count');
    const { data: { count: images } } = await axios.get('/images/count');
    const { data: { count: documents } } = await axios.get('/documents/count');
    const { data: { count: emails } } = await axios.get('/emails/count');
    const { data: { count: chats } } = await axios.get('/chats/count');
    const { data: { count: appointments } } = await axios.get('/appointments/count');
    const { data: { count: tasks } } = await axios.get('/tasks/count');
    const { data: { count: contracts } } = await axios.get('/contracts/count');
    const { data: { count: amendments } } = await axios.get('/amendments/count');
    const { data: { count: milestones } } = await axios.get('/milestones/count');

    counts.users = users;
    counts.contacts = contacts;
    counts.addresses = addresses;
    counts.estimates = estimates;
    counts.jobs = jobs;
    counts.roles = roles;
    counts.permissions = permissions;
    counts.templates = templates;
    counts.trades = trades;
    counts.invoices = invoices;
    counts.orders = orders;
    counts.images = images;
    counts.documents = documents;
    counts.emails = emails;
    counts.chats = chats;
    counts.appointments = appointments;
    counts.tasks = tasks;
    counts.contracts = contracts;
    counts.amendments = amendments;
    counts.milestones = milestones;

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
          /></a><a href="#/addresses">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.addresses"
        label="Addresses"
          /></a><a href="#/estimates">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.estimates"
        label="Estimates"
          /></a><a href="#/jobs">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.jobs"
        label="Jobs"
          /></a><a href="#/roles">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.roles"
        label="Roles"
          /></a><a href="#/permissions">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.permissions"
        label="Permissions"
          /></a><a href="#/templates">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.templates"
        label="Templates"
          /></a><a href="#/trades">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.trades"
        label="Trades"
          /></a><a href="#/invoices">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.invoices"
        label="Invoices"
          /></a><a href="#/orders">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.orders"
        label="Orders"
          /></a><a href="#/images">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.images"
        label="Images"
          /></a><a href="#/documents">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.documents"
        label="Documents"
          /></a><a href="#/emails">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.emails"
        label="Emails"
          /></a><a href="#/chats">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.chats"
        label="Chats"
          /></a><a href="#/appointments">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.appointments"
        label="Appointments"
          /></a><a href="#/tasks">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.tasks"
        label="Tasks"
          /></a><a href="#/contracts">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.contracts"
        label="Contracts"
          /></a><a href="#/amendments">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.amendments"
        label="Amendments"
          /></a><a href="#/milestones">
        <CardBoxWidget
        color="text-blue-500"
        :icon="mdiInformation"
        :number="counts.milestones"
        label="Milestones"
          /></a>

    </div>
  </SectionMain>
</template>
