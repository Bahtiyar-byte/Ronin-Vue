import { defineStore } from 'pinia'
import axios from 'axios'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultContactId: [],

            searchResultCreatedBy: [],

            searchResultAssignedUser: [],

            searchResultAssignedTeam: [],

            searchResultEstimateId: [],

            searchResultAppointmentId: [],

            searchResultImageId: [],

            searchResultDocumentId: [],

            searchResultInvoiceId: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`jobs${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/jobs/${id}`);
        this.showNotification('Users has been deleted', 'success');
        await this.fetch()
      } catch (e) {
        console.log('deleteItem error', e)
        // dispatch('snackbar/showSnackbar', e, { root: true });
      }
    },
    async newItem(payload) {
      this.startLoading();
      try {
        const result = await axios.post('/jobs', { data: payload });
        this.showNotification('Jobs has been created', 'success');
        this.getData(result.data)
      } catch (e) {
        console.log(e)
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async edit(payload) {
      this.startLoading();
      try {
        const result = await axios.put(`/jobs/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Jobs has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchContactId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/contacts/autocomplete?query=${val}&limit=100`,
                  );
                  this.setContactId(result.data);
                } else {
                  const result = await axios(`/contacts/autocomplete?limit=100`);
                  this.setContactId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setContactId([]);
              }
            },

            async searchCreatedBy(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setCreatedBy(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setCreatedBy(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setCreatedBy([]);
              }
            },

            async searchAssignedUser(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAssignedUser(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setAssignedUser(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAssignedUser([]);
              }
            },

            async searchAssignedTeam(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/teams/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAssignedTeam(result.data);
                } else {
                  const result = await axios(`/teams/autocomplete?limit=100`);
                  this.setAssignedTeam(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAssignedTeam([]);
              }
            },

            async searchEstimateId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/estimates/autocomplete?query=${val}&limit=100`,
                  );
                  this.setEstimateId(result.data);
                } else {
                  const result = await axios(`/estimates/autocomplete?limit=100`);
                  this.setEstimateId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setEstimateId([]);
              }
            },

            async searchAppointmentId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/appointments/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAppointmentId(result.data);
                } else {
                  const result = await axios(`/appointments/autocomplete?limit=100`);
                  this.setAppointmentId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAppointmentId([]);
              }
            },

            async searchImageId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/images/autocomplete?query=${val}&limit=100`,
                  );
                  this.setImageId(result.data);
                } else {
                  const result = await axios(`/images/autocomplete?limit=100`);
                  this.setImageId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setImageId([]);
              }
            },

            async searchDocumentId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/documents/autocomplete?query=${val}&limit=100`,
                  );
                  this.setDocumentId(result.data);
                } else {
                  const result = await axios(`/documents/autocomplete?limit=100`);
                  this.setDocumentId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setDocumentId([]);
              }
            },

            async searchInvoiceId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/invoices/autocomplete?query=${val}&limit=100`,
                  );
                  this.setInvoiceId(result.data);
                } else {
                  const result = await axios(`/invoices/autocomplete?limit=100`);
                  this.setInvoiceId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setInvoiceId([]);
              }
            },

    startLoading() {
      this.loading = false;
    },
    getData(payload) {
      this.data = payload;
    },
    finishLoading() {
      this.loading = false;
    },
    showNotification(payload, type) {
      this.notify.showNotification = true
      this.notify.textNotification = payload
      this.notify.typeNotification = type
    },
    hideNotification() {
      this.notify.showNotification = false
      this.notify.textNotification = ''
    },

        setContactId(payload) {
            this.searchResultContactId = payload
        },

        setCreatedBy(payload) {
            this.searchResultCreatedBy = payload
        },

        setAssignedUser(payload) {
            this.searchResultAssignedUser = payload
        },

        setAssignedTeam(payload) {
            this.searchResultAssignedTeam = payload
        },

        setEstimateId(payload) {
            this.searchResultEstimateId = payload
        },

        setAppointmentId(payload) {
            this.searchResultAppointmentId = payload
        },

        setImageId(payload) {
            this.searchResultImageId = payload
        },

        setDocumentId(payload) {
            this.searchResultDocumentId = payload
        },

        setInvoiceId(payload) {
            this.searchResultInvoiceId = payload
        },

  }
})
