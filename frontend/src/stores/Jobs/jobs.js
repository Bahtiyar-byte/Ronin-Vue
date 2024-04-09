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

            searchResultContact: [],

            searchResultAssignedUser: [],

            searchResultAssignedTeam: [],

            searchResultEstimate: [],

            searchResultAppointment: [],

            searchResultImage: [],

            searchResultDocument: [],

            searchResultInvoice: [],

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

            async searchContact(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/contacts/autocomplete?query=${val}&limit=100`,
                  );
                  this.setContact(result.data);
                } else {
                  const result = await axios(`/contacts/autocomplete?limit=100`);
                  this.setContact(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setContact([]);
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

            async searchEstimate(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/estimates/autocomplete?query=${val}&limit=100`,
                  );
                  this.setEstimate(result.data);
                } else {
                  const result = await axios(`/estimates/autocomplete?limit=100`);
                  this.setEstimate(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setEstimate([]);
              }
            },

            async searchAppointment(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/appointments/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAppointment(result.data);
                } else {
                  const result = await axios(`/appointments/autocomplete?limit=100`);
                  this.setAppointment(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAppointment([]);
              }
            },

            async searchImage(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/images/autocomplete?query=${val}&limit=100`,
                  );
                  this.setImage(result.data);
                } else {
                  const result = await axios(`/images/autocomplete?limit=100`);
                  this.setImage(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setImage([]);
              }
            },

            async searchDocument(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/documents/autocomplete?query=${val}&limit=100`,
                  );
                  this.setDocument(result.data);
                } else {
                  const result = await axios(`/documents/autocomplete?limit=100`);
                  this.setDocument(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setDocument([]);
              }
            },

            async searchInvoice(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/invoices/autocomplete?query=${val}&limit=100`,
                  );
                  this.setInvoice(result.data);
                } else {
                  const result = await axios(`/invoices/autocomplete?limit=100`);
                  this.setInvoice(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setInvoice([]);
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

        setContact(payload) {
            this.searchResultContact = payload
        },

        setAssignedUser(payload) {
            this.searchResultAssignedUser = payload
        },

        setAssignedTeam(payload) {
            this.searchResultAssignedTeam = payload
        },

        setEstimate(payload) {
            this.searchResultEstimate = payload
        },

        setAppointment(payload) {
            this.searchResultAppointment = payload
        },

        setImage(payload) {
            this.searchResultImage = payload
        },

        setDocument(payload) {
            this.searchResultDocument = payload
        },

        setInvoice(payload) {
            this.searchResultInvoice = payload
        },

  }
})
