import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultRoleId: [],

            searchResultCreatedBy: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`users${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/users/${id}`);
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
        const result = await axios.post('/users', { data: payload });
        this.showNotification('Users has been created', 'success');
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
        const result = await axios.put(`/users/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        // dispatch('auth/findMe', null, {root: true})
        // 
        this.showNotification('Users has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchRoleId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/roles/autocomplete?query=${val}&limit=100`,
                  );
                  this.setRoleId(result.data);
                } else {
                  const result = await axios(`/roles/autocomplete?limit=100`);
                  this.setRoleId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setRoleId([]);
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

        setRoleId(payload) {
            this.searchResultRoleId = payload
        },

        setCreatedBy(payload) {
            this.searchResultCreatedBy = payload
        },

  }
})
