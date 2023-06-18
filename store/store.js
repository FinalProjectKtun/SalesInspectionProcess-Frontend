import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      count: 0,
      isModalOpen: false,
      isConModalOpen: false,
      isDetailsModalOpen: false,
      isFinanceModalOpen: false,
      isHukukModalOpen: false,
      responsiblePersons: [],
      accessRequestedSystems: [],
      allRequestsData: [],
      postReqResponseData: [],
      requestData: {},
    };
  },

  mutations: {
    OPEN_REQUEST_MODAL(state) {
      state.isModalOpen = true;
    },

    OPEN_DETAILS_MODAL(state) {
      state.isDetailsModalOpen = true;
    },
    
    OPEN_FINANCE_MODAL(state) {
      state.isFinanceModalOpen = true;
    },

    OPEN_LEGAL_MODAL(state) {
      state.isHukukModalOpen = true;
    },

    CLOSE_MODAL(state) {
      state.isModalOpen = false;
      state.isConModalOpen = false;
      state.isDetailsModalOpen = false;
      state.isFinanceModalOpen = false;
      state.isHukukModalOpen = false;
    },

    INIT_PERSON_DATA(state, newData) {
      state.responsiblePersons = newData;
    },

    INIT_REQUEST_DATA(state, newData) {
      state.allRequestsData = newData;
    },

    SET_RESPONSE_DATA(state, responseData) {
      state.responseData = responseData;
    },

    GET_DATA_TO_MODAL(state, data) {
      state.requestData = data;
    },

    OPEN_CONFIRMATION_MODAL(state) {
      state.isConModalOpen = true;
    },

    //   INIT_SYSTEM_DATA(state, newData) {
    //     state.accessRequestedSystems = newData;
    //   },
  },

  actions: {
    openModal({ commit }) {
      commit("OPEN_REQUEST_MODAL");
    },

    openFinanceModal({ commit }) {
      commit("OPEN_FINANCE_MODAL");
    },

    openHukukModal({ commit }) {
      commit("OPEN_LEGAL_MODAL");
    },

    closeModal({ commit }) {
      commit("CLOSE_MODAL");
    },

    initResponsiblePersonsData(context) {
      axios.get("http://localhost:8081/getPerson").then((response) => {
        context.commit("INIT_PERSON_DATA", response.data.data);
        console.log(response.data.data);
      });
    },

    initAllRequestsData(context) {
      axios.get("http://localhost:8081/getTalepBilgi").then((response) => {
        context.commit("INIT_REQUEST_DATA", response.data.data);
      });
    },

    postRequestData(context, data) {
      axios
        .post("http://localhost:8081/postTalepBilgi", data)
        .then((response) => {
          context.commit("SET_RESPONSE_DATA", response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
      axios
        .get("http://localhost:8081/getTalepBilgi")
        .then((response) => {
          context.commit("INIT_REQUEST_DATA", response.data.data);
        });
    },

    postFinanceRequestData(context, data) {
      axios
        .post("http://localhost:8081/updateFinansTahkik", data)
        .then((response) => {
          context.commit("SET_RESPONSE_DATA", response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
      axios
        .get("http://localhost:8081/getTalepBilgi")
        .then((response) => {
          context.commit("INIT_REQUEST_DATA", response.data.data);
        });
    },

    postLegalRequestData(context, data) {
      axios
        .post("http://localhost:8081/updateHukukTahkik", data)
        .then((response) => {
          context.commit("SET_RESPONSE_DATA", response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
      axios
        .get("http://localhost:8081/getTalepBilgi")
        .then((response) => {
          context.commit("INIT_REQUEST_DATA", response.data.data);
        });
    },

    openConModal({ commit }) {
      commit("OPEN_CONFIRMATION_MODAL");
    },

    openDetailsModal({ commit }) {
      commit("OPEN_DETAILS_MODAL");
    },

    getRequestDataToModal({ commit }, data) {
      commit("GET_DATA_TO_MODAL", data);
    },

    //   initAccessRequestedSystemsData(context) {
    //     axios
    //       .get("http://localhost:8081/api/scs/getSupplierConnectSystem")
    //       .then((response) => {
    //         context.commit("INIT_SYSTEM_DATA", response.data.data);
    //       });
    //   },

    updateStatusOfRequest() {
      axios
        .post("http://localhost:8081/status", {
          id: this.state.requestData.id,
          status: this.state.requestData.status,
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },

    //   initReasonForRejection() {
    //     axios
    //       .post("http://localhost:8081/updateSupplierStatus", {
    //         id: this.state.requestData.id,
    //         status: this.state.requestData.status,
    //         reasonForRejection: this.state.requestData.reasonForRejection,
    //       })
    //       .catch((error) => {
    //         console.log("Error", error);
    //       });
    //   },
  },
});

export default store;
