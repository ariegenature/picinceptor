import Vue from 'vue'
import axios from 'axios'

let baseUrl

export default {
  install (vue, options) {
    baseUrl = options.baseUrl
    Vue.prototype.$post = $post
    Vue.prototype.$get = $get
  }
}

export async function $get (url) {
  try {
    const response = await axios.get(`${baseUrl}${url}`)
    return response
  } catch (e) {
    throw e
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
