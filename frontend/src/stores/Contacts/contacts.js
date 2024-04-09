import { defineStore } from 'pinia'
import axios from 'axios'

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultJobId: [],

            searchResultEstimateId: [],

            searchResultCreatedBy: [],

            searchResultAppointmentId: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`contacts${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/contacts/${id}`);
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
        const result = await axios.post('/contacts', { data: payload });
        this.showNotification('Contacts has been created', 'success');
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
        const result = await axios.put(`/contacts/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Contacts has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchJobId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/jobs/autocomplete?query=${val}&limit=100`,
                  );
                  this.setJobId(result.data);
                } else {
                  const result = await axios(`/jobs/autocomplete?limit=100`);
                  this.setJobId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setJobId([]);
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

        setJobId(payload) {
            this.searchResultJobId = payload
        },

        setEstimateId(payload) {
            this.searchResultEstimateId = payload
        },

        setCreatedBy(payload) {
            this.searchResultCreatedBy = payload
        },

        setAppointmentId(payload) {
            this.searchResultAppointmentId = payload
        },

  }
})
