import axios from "axios"

const instance = axios.create({
    baseURL: 'https://nut-case.s3.amazonaws.com/coursessc.json'
    
  });

export default instance