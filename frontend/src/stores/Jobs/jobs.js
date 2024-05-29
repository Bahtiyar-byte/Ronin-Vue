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

            searchResultOrderId: [],

            searchResultAssignedUserId: [],

            searchResultCreatedBy: [],

            searchResultUpdatedBy: [],

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

            async searchOrderId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/orders/autocomplete?query=${val}&limit=100`,
                  );
                  this.setOrderId(result.data);
                } else {
                  const result = await axios(`/orders/autocomplete?limit=100`);
                  this.setOrderId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setOrderId([]);
              }
            },

            async searchAssignedUserId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAssignedUserId(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setAssignedUserId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAssignedUserId([]);
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

            async searchUpdatedBy(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setUpdatedBy(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setUpdatedBy(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setUpdatedBy([]);
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

        setOrderId(payload) {
            this.searchResultOrderId = payload
        },

        setAssignedUserId(payload) {
            this.searchResultAssignedUserId = payload
        },

        setCreatedBy(payload) {
            this.searchResultCreatedBy = payload
        },

        setUpdatedBy(payload) {
            this.searchResultUpdatedBy = payload
        },

  }
})
