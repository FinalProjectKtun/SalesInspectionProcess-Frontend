import { createStore } from "vuex";
import axios from "axios";
import router from "../src/router/router";

const store = createStore({
  state() {
    return {
      count: 0,
      isModalOpen: false,
      isConModalOpen: false,
      isDetailsModalOpen: false,
      isFinanceModalOpen: false,
      isHukukModalOpen: false,
      loggedIn: true,
      responsiblePersons: [],
      accessRequestedSystems: [],
      allRequestsData: [],
      postReqResponseData: [],
      signInResponse: "",
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

    SET_SIGN_IN_RESPONSE(state, data) {
      state.signInResponse = data;
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
      axios.get("http://localhost:8081/person/getPerson").then((response) => {
        context.commit("INIT_PERSON_DATA", response.data.data);
        console.log(response.data.data);
      });
    },

    initAllRequestsData(context) {
      axios
        .get("http://localhost:8081/talepBilgi/getTalepBilgi")
        .then((response) => {
          context.commit("INIT_REQUEST_DATA", response.data.data);
        });
    },

    postRequestData(context, data) {
      axios
        .post("http://localhost:8081/talepBilgi/postTalepBilgi", data)
        .then((response) => {
          context.commit("SET_RESPONSE_DATA", response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
      axios
        .get("http://localhost:8081/talepBilgi/getTalepBilgi")
        .then((response) => {
          context.commit("INIT_REQUEST_DATA", response.data.data);
        });
    },

    postFinanceRequestData(context, data) {
      axios
        .post("http://localhost:8081/talepBilgi/updateFinansTahkik", data)
        .then((response) => {
          context.commit("SET_RESPONSE_DATA", response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
      axios
        .get("http://localhost:8081/talepBilgi/getTalepBilgi")
        .then((response) => {
          context.commit("INIT_REQUEST_DATA", response.data.data);
        });
    },

    postLegalRequestData(context, data) {
      axios
        .post("http://localhost:8081/talepBilgi/updateHukukTahkik", data)
        .then((response) => {
          context.commit("SET_RESPONSE_DATA", response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
      axios
        .get("http://localhost:8081/talepBilgi/getTalepBilgi")
        .then((response) => {
          context.commit("INIT_REQUEST_DATA", response.data.data);
        });
    },

    signIn(context, data) {
      axios
        .post("http://localhost:8081/api/auth/signin", data)
        .then((response) => {
          context.commit("SET_SIGN_IN_RESPONSE", response.data);
          console.log("response data", response.data);
          if (response.data === "User signed-in successfully!.") {
            router.push({ path: "/" });
            this.state.loggedIn = true;
          }
        })
        .catch((error) => {
          console.log("Error", error);
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

    updateStatusOfRequest() {
      axios
        .post("http://localhost:8081/talepBilgi/status", {
          id: this.state.requestData.id,
          status: this.state.requestData.status,
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },

    //   initAccessRequestedSystemsData(context) {
    //     axios
    //       .get("http://localhost:8081/api/scs/getSupplierConnectSystem")
    //       .then((response) => {
    //         context.commit("INIT_SYSTEM_DATA", response.data.data);
    //       });
    //   },
    initReasonForRejection() {
      axios
        .post("http://localhost:8081/talepBilgi/reasonForRejection", {
          id: this.state.requestData.id,
          status: this.state.requestData.status,
          reasonForRejection: this.state.requestData.reasonForRejection,
          reasonForRejectionPerson: this.state.requestData.reasonForRejectionPerson
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  },
});

export default store;
