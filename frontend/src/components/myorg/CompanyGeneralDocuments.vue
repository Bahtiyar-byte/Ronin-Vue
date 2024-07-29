<script setup lang="ts">
import StaffDirectory from '@/components/myorg/StaffDirectory.vue'
import pdfRed from "@images/icons/file/pdf.png";
const pdf = useGenerateImageVariant(pdfRed);

const myOrgDocumentTypes = [
  { id: 1, title: "Company General Documents" },
  { id: 2, title: "Subcontractor Docs" },
  { id: 3, title: "Staff Directory" },
  { id: 4, title: "Templates" },
];

const paymentMethodsData = [
  {
    title: "Licence",
    type: "View",
    img: pdf,
  },
  {
    title: "Contracts",
    type: "View",
    img: pdf,
  },
  {
    title: "Agreements",
    type: "View",
    img: pdf,
  },
  {
    title: "Bank licence",
    type: "View",
    img: pdf,
  },
  {
    title: "Insurance licence",
    type: "View",
    img: pdf,
  },
];


const subContractorDocs = [
  {
    title: "Subcontractor form",
    type: "View",
    img: pdf,
  },
  {
    title: "Subcontractor form",
    type: "View",
    img: pdf,
  },
  {
    title: "Subcontractor form",
    type: "View",
    img: pdf,
  },
  {
    title: "Subcontractor form",
    type: "View",
    img: pdf,
  },
  {
    title: "Subcontractor form",
    type: "View",
    img: pdf,
  },
];

</script>

<template>
  <VExpansionPanels multiple>

    <VExpansionPanel class="mb-6">
      <VExpansionPanelTitle style="font-size: 25"> Company General Documents </VExpansionPanelTitle>
      <VExpansionPanelText>
        <div v-for="(item, index) in paymentMethodsData" :key="index">
          <div class="d-flex justify-space-between align-center py-4 gap-x-4">
            <div class="d-flex align-center">
              <VImg :src="item.img.value" height="30" width="50" class="me-4" />
              <h6 class="text-h6">
                {{ item.title }}
              </h6>
            </div>
            <div class="d-none d-sm-block text-body-1">
              {{ item.type }}
            </div>
          </div>
          <VDivider v-if="index !== paymentMethodsData.length - 1" />
        </div>
      </VExpansionPanelText>
      <VBtn class="ml-6" icon="tabler-plus" rounded />
    </VExpansionPanel>

    <VExpansionPanel class="mb-6">
      <VExpansionPanelTitle style="font-size: 25"> Subcontractor Docs </VExpansionPanelTitle>
      <VExpansionPanelText>
        <div v-for="(item, index) in subContractorDocs" :key="index">
          <div class="d-flex justify-space-between align-center py-4 gap-x-4">
            <div class="d-flex align-center">
              <VImg :src="item.img.value" height="30" width="50" class="me-4" />
              <h6 class="text-h6">
                {{ item.title }}
              </h6>
            </div>
            <div class="d-none d-sm-block text-body-1">
              {{ item.type }}
            </div>
          </div>
          <VDivider v-if="index !== paymentMethodsData.length - 1" />
        </div>
      </VExpansionPanelText>
      <VBtn class="ml-6" icon="tabler-plus" rounded />
    </VExpansionPanel>

    <VExpansionPanel >
      <VExpansionPanelTitle style="font-size: 25"> Staff Directory </VExpansionPanelTitle>
      <VExpansionPanelText>
        <StaffDirectory />
      </VExpansionPanelText>
      <!-- <VBtn class="ml-6" icon="tabler-plus" rounded /> -->
    </VExpansionPanel>

    <VExpansionPanel class="mb-6">
      <VExpansionPanelTitle style="font-size: 25"> Templates </VExpansionPanelTitle>
      <VExpansionPanelText>
        <div v-for="(item, index) in subContractorDocs" :key="index">
          <div class="d-flex justify-space-between align-center py-4 gap-x-4">
            <div class="d-flex align-center">
              <VImg :src="item.img.value" height="30" width="50" class="me-4" />
              <h6 class="text-h6">
                {{ item.title }}
              </h6>
            </div>
            <div class="d-none d-sm-block text-body-1">
              {{ item.type }}
            </div>
          </div>
          <VDivider v-if="index !== paymentMethodsData.length - 1" />
        </div>
      </VExpansionPanelText>
      <VBtn class="ml-6" icon="tabler-plus" rounded />
    </VExpansionPanel>

  </VExpansionPanels>
</template>
