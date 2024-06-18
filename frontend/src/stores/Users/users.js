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

            searchResultApp_role: [],

            searchResultCustom_permissions: [],

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

            async searchApp_role(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/roles/autocomplete?query=${val}&limit=100`,
                  );
                  this.setApp_role(result.data);
                } else {
                  const result = await axios(`/roles/autocomplete?limit=100`);
                  this.setApp_role(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setApp_role([]);
              }
            },

            async searchCustom_permissions(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/permissions/autocomplete?query=${val}&limit=100`,
                  );
                  this.setCustom_permissions(result.data);
                } else {
                  const result = await axios(`/permissions/autocomplete?limit=100`);
                  this.setCustom_permissions(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setCustom_permissions([]);
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

        setApp_role(payload) {
            this.searchResultApp_role = payload
        },

        setCustom_permissions(payload) {
            this.searchResultCustom_permissions = payload
        },

  }
})
