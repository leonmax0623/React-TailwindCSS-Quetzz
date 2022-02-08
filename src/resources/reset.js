import { post, put } from "./util"

export const resetAPI = {
    passwordLink: username => post(`/credentials/send/resetLink/${encodeURIComponent(username.toLowerCase().trim())}`),
    forgotUsername: email => post(`/credentials/send/username/${encodeURIComponent(email.toLowerCase().trim())}`),
    resetPassword: (password, passwordConfirm, token) => put("/credentials/password/reset", {}, {password, passwordConfirm, token}),
}