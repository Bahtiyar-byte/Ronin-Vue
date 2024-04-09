import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppointmentsStore = defineStore('appointments', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultUserId: [],

            searchResultContactId: [],

            searchResultJobId: [],

            searchResultEstimateId: [],

            searchResultCreatedBy: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`appointments${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/appointments/${id}`);
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
        const result = await axios.post('/appointments', { data: payload });
        this.showNotification('Appointments has been created', 'success');
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
        const result = await axios.put(`/appointments/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Appointments has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchUserId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setUserId(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setUserId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setUserId([]);
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

        setUserId(payload) {
            this.searchResultUserId = payload
        },

        setContactId(payload) {
            this.searchResultContactId = payload
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

  }
})
