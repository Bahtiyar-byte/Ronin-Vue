import { defineStore } from 'pinia'
import axios from 'axios'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultUser: [],

            searchResultTeam: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`teams${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/teams/${id}`);
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
        const result = await axios.post('/teams', { data: payload });
        this.showNotification('Teams has been created', 'success');
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
        const result = await axios.put(`/teams/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Teams has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchUser(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setUser(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setUser(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setUser([]);
              }
            },

            async searchTeam(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/teams/autocomplete?query=${val}&limit=100`,
                  );
                  this.setTeam(result.data);
                } else {
                  const result = await axios(`/teams/autocomplete?limit=100`);
                  this.setTeam(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setTeam([]);
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

        setUser(payload) {
            this.searchResultUser = payload
        },

        setTeam(payload) {
            this.searchResultTeam = payload
        },

  }
})
