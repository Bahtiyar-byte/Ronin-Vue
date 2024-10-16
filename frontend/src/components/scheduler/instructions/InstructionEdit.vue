<script lang="ts" setup>
const props = defineProps<Props>()
const { update: updateLaborTicket } = useLaborTickets()
interface Props {
  ticket: { id: number; name: string; start_date: string; end_date: string; trade: string; template: string; related_order: { related_estimate: { related_contact: object } } }
}
const _ticket = ref(props?.ticket)

const isDialogVisible = ref(false)

interface Status {
  Verified: string
  Rejected: string
  Pending: string
}

interface Transition {
  cardImg: string
  lastDigit: string
  cardType: string
  sentDate: string
  status: keyof Status
  trend: string
}

const saveCrewInstructions = () => {
  const laborTicket = {
    id: props?.ticket.id,
    name: props?.ticket.name || null,
    start_date: props?.ticket.start_date || null,
    end_date: props?.ticket.end_date || null,
    crew_instructions: props?.ticket.crew_instructions || null,
    actual_start_time: props?.ticket.actual_start_time || null,
    actual_end_time: props?.ticket.actual_end_time || null,
    crew_actions: props?.ticket.crew_actions || null,
    labor_progress: props?.ticket.labor_progress || null,
    disclaimer: props?.ticket.disclaimer || null,
    assigned_date: props?.ticket.assigned_date || null,
  }

  const response: boolean = updateLaborTicket(laborTicket)
  if (response) {
    isDialogVisible.value = false
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    :scrim="false"
    persistent
    :width="$vuetify.display.smAndDown ? 'auto' : 1350"
    :height="$vuetify.display.smAndDown ? 'auto' : 950"
    transition="dialog-transition"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        color="primary"
        variant="text"
      >
        <VIcon
          start
          icon="tabler-pencil"
        />
        Edit
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard class="p-3">
      <!-- Toolbar -->
      <div>
        <VToolbar color="primary">
          <VBtn
            icon
            variant="plain"
            @click="isDialogVisible = false"
          >
            <VIcon
              color="white"
              icon="tabler-x"
            />
          </VBtn>

          <VToolbarTitle>Crew Instructions</VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              @click="isDialogVisible = false"
            >
              Save
            </VBtn>
          </VToolbarItems>
        </VToolbar>
      </div>

      <VCard
        style="height: 95vh"
        class="scrollable"
      >
        <VCardText>
          <VDivider class="mb-2" />
          <span><b>{{ props?.ticket?.related_order?.order_name }}</b></span>
          <VList class="card-list m-3 ml-0">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium"> Trade: </span>
                <div class="d-inline-block text-body-1 mr-4">
                  Box Gutters
                </div>

                <span class="font-medium"> PO#: </span>
                <div class="d-inline-block text-body-1">
                  {{ props?.ticket?.related_order?.order_po_number }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>

          <VList class="card-list m-3 ml-0">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium"> Are there any specific instructions you would like to give the crew? </span>
                <br>
              </VListItemTitle>
              <div style="">
                <AppTextarea
                  v-model="_ticket.crew_instructions"
                  label="Crew Instructions"
                  placeholder="Crew Instructions"
                />
              </div>
            </VListItem>

            <VCardText class="d-flex justify-end flex-wrap gap-3">
              <VBtn
                variant="tonal"
                color="secondary"
                @click="isDialogVisible = false"
              >
                Cancel
              </VBtn>
              <VBtn @click="saveCrewInstructions">
                Save
              </VBtn>
            </VCardText>
          </VList>
        </VCardText>
      </VCard>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.scrollable {
  overflow-y: scroll !important;
}
</style>
