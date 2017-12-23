import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.token),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },


};

/* export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials })
      .then(res => {
        if (res.status === 400 ) {
          return {status: 400, error: JSON.parse(res.errors.global)}
        } 
        else
        return {status: 200, token: JSON.parse(res.token)}
      }),
    signup: user =>
      fetch("/api/users", {
        method:'post', body: JSON.stringify(user)
      }).then(res => res.data.user) */
//      axios.post("/api/users", { user }).then(res => res.data.user),
/*     confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data }) */
