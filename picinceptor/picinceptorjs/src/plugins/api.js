import Vue from 'vue'
import axios from 'axios'

export default {
  install (vue) {
    Vue.prototype.$post = $post
    Vue.prototype.$get = $get
  }
}

export async function $get (url) {
  try {
    const response = await axios.get(url)
    return response
  } catch (e) {
    throw e
  }
}

export async function $post (url, data) {
  try {
    const response = await axios.post(url, data)
    return response
  } catch (e) {
    throw e
  }
}
