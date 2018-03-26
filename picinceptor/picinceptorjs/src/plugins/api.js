import Vue from 'vue'
import axios from 'axios'

let baseUrl

export default {
  install (vue, options) {
    baseUrl = options.baseUrl
    Vue.prototype.$post = $post
  }
}

export async function $post (url, data) {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data)
    return response
  } catch (e) {
    throw e
  }
}
