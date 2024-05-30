import { defineStore } from 'pinia'
import axios from 'axios'

export const useImagesStore = defineStore('images', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultJobId: [],

            searchResultUserId: [],

            searchResultDocumentId: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`images${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/images/${id}`);
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
        const result = await axios.post('/images', { data: payload });
        this.showNotification('Images has been created', 'success');
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
        const result = await axios.put(`/images/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Images has been updated', 'success');
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

        setUserId(payload) {
            this.searchResultUserId = payload
        },

        setDocumentId(payload) {
            this.searchResultDocumentId = payload
        },

  }
})
