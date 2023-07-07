import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}



export default { login }
