import { defineStore } from 'pinia'
import axios from 'axios'

export const useEstimatesStore = defineStore('estimates', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultJob: [],

            searchResultTemplate: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`estimates${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/estimates/${id}`);
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
        const result = await axios.post('/estimates', { data: payload });
        this.showNotification('Estimates has been created', 'success');
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
        const result = await axios.put(`/estimates/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Estimates has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchJob(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/jobs/autocomplete?query=${val}&limit=100`,
                  );
                  this.setJob(result.data);
                } else {
                  const result = await axios(`/jobs/autocomplete?limit=100`);
                  this.setJob(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setJob([]);
              }
            },

            async searchTemplate(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/templates/autocomplete?query=${val}&limit=100`,
                  );
                  this.setTemplate(result.data);
                } else {
                  const result = await axios(`/templates/autocomplete?limit=100`);
                  this.setTemplate(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setTemplate([]);
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

        setJob(payload) {
            this.searchResultJob = payload
        },

        setTemplate(payload) {
            this.searchResultTemplate = payload
        },

  }
})
