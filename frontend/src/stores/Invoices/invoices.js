import { defineStore } from 'pinia'
import axios from 'axios'

export const useInvoicesStore = defineStore('invoices', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultJobId: [],

            searchResultCreatedBy: [],

            searchResultUpdatedBy: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`invoices${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/invoices/${id}`);
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
        const result = await axios.post('/invoices', { data: payload });
        this.showNotification('Invoices has been created', 'success');
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
        const result = await axios.put(`/invoices/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Invoices has been updated', 'success');
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

        setJobId(payload) {
            this.searchResultJobId = payload
        },

        setCreatedBy(payload) {
            this.searchResultCreatedBy = payload
        },

        setUpdatedBy(payload) {
            this.searchResultUpdatedBy = payload
        },

  }
})
