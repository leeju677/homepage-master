import Vue from 'vue'
import { axiosInstanceCredentials, axiosFormInstanceCredentials } from "@/store/index";

const methods = {
  async ApiGet(url, params) {
    if (process.env.DEBUG_MODE) {
      console.log('[ApiGet] REQ ', url, params)
    }
    try {
      /** GET by params Request */
      let response = await axiosInstanceCredentials.get(url, { params: params })

      if (process.env.DEBUG_MODE) {
        console.log('[ApiGet] => RES ', response);
      }
      if (response) {
        if (response.data.returnCode == 'S') {
          return response;
        } else {
          if (process.env.DEBUG_MODE) {
            this.$Alert("Error", response.data.errorMessage +'('+ response.data.errorCode +')');
          } else {
            this.$Alert("Error", response.data.errorMessage);
          }
          return response;
        }
      } else {
        this.$Alert("Error", '데이터를 가져오지 못했습니다. [ '+url+' ]');
        return {
          returnCode: 'F',
          errorMessage: '데이터를 처리하지 못했습니다.'
        };
      }
    } catch (error) {
      //console.log(error);
      this.$Alert("Error", '처리할 수 없는 요청입니다. [ '+url+' ]');
      return {
        returnCode: 'F',
        errorMessage: '처리할 수 없는 요청입니다.'
      };
    }
  },

  async ApiGetByData(url, params) {
    if (process.env.DEBUG_MODE) {
      console.log('[ApiGetByData] REQ ', url, params)
    }
    try {
      /** GET by data Request */
      let response = await axiosInstanceCredentials.get(url, { data: data })

      if (process.env.DEBUG_MODE) {
        console.log('[ApiGetByData] => RES ', response);
      }
      if (response) {
        if (response.data.returnCode == 'S') {
          return response;
        } else {
          if (process.env.DEBUG_MODE) {
            this.$Alert("Error", response.data.errorMessage +'('+ response.data.errorCode +')');
          } else {
            this.$Alert("Error", response.data.errorMessage);
          }
          return response;
        }
      } else {
        this.$Alert("Error", '데이터를 가져오지 못했습니다. [ '+url+' ]');
        return {
          returnCode: 'F',
          errorMessage: '데이터를 처리하지 못했습니다.'
        };
      }
    } catch (error) {
      //console.log(error);
      this.$Alert("Error", '처리할 수 없는 요청입니다. [ '+url+' ]');
      return {
        returnCode: 'F',
        errorMessage: '처리할 수 없는 요청입니다.'
      };
    }
  },

  async ApiPost(url, data) {
    if (process.env.DEBUG_MODE) {
      console.log('[ApiPost] REQ ', url, data)
    }
    try {
      /** POST Request */
      let response = await axiosInstanceCredentials.post(url, data)
      if (process.env.DEBUG_MODE) {
        console.log('[ApiPost] => RES ', response);
      }
      if (response) {
        if (response.data.returnCode == 'S') {
          return response;
        } else {
          if (process.env.DEBUG_MODE) {
            this.$Alert("Error", response.data.errorMessage +'('+ response.data.errorCode +')');
          } else {
            this.$Alert("Error", response.data.errorMessage);
          }
          return response;
        }
      } else {
        this.$Alert("Error", '데이터를 처리하지 못했습니다. [ '+url+' ]');
        return {
          returnCode: 'F',
          errorMessage: '데이터를 처리하지 못했습니다.'
        };
      }
    } catch (error) {
      //console.log(error);
      this.$Alert("Error", '처리할 수 없는 요청입니다. [ '+url+' ]');
      return {
        returnCode: 'F',
        errorMessage: '처리할 수 없는 요청입니다.'
      };
    }
  },

  async ApiPostForm(url, formData) {
    if (process.env.DEBUG_MODE) {
      console.log('[ApiPostForm] REQ ', url, formData)
    }
    try {
      /** POST Request */
      let response = await axiosFormInstanceCredentials.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (process.env.DEBUG_MODE) {
        console.log('[ApiPostForm] => RES ', response);
      }
      if (response) {
        if (response.data.returnCode == 'S') {
          return response;
        } else {
          if (process.env.DEBUG_MODE) {
            this.$Alert("Error", response.data.errorMessage +'('+ response.data.errorCode +')');
          } else {
            this.$Alert("Error", response.data.errorMessage);
          }
          return response;
        }
      } else {
        this.$Alert("Error", '데이터를 처리하지 못했습니다. [ '+url+' ]');
        return {
          returnCode: 'F',
          errorMessage: '데이터를 처리하지 못했습니다.'
        };
      }
    } catch (error) {
      //console.log(error);
      this.$Alert("Error", '처리할 수 없는 요청입니다. [ '+url+' ]');
      return {
        returnCode: 'F',
        errorMessage: '처리할 수 없는 요청입니다.'
      };
    }
  },

  async ApiPut(url, data) {
    if (process.env.DEBUG_MODE) {
      console.log('[ApiPut] REQ ', url, data)
    }
    try {
      /** POST Request */
      let response = await axiosInstanceCredentials.put(url, data)
      if (process.env.DEBUG_MODE) {
        console.log('[ApiPut] => RES ', response);
      }
      if (response) {
        if (response.data.returnCode == 'S') {
          return response;
        } else {
          if (process.env.DEBUG_MODE) {
            this.$Alert("Error", response.data.errorMessage +'('+ response.data.errorCode +')');
          } else {
            this.$Alert("Error", response.data.errorMessage);
          }
          return response;
        }
      } else {
        this.$Alert("Error", '데이터를 처리하지 못했습니다. [ '+url+' ]');
        return {
          returnCode: 'F',
          errorMessage: '데이터를 처리하지 못했습니다.'
        };
      }
    } catch (error) {
      //console.log(error);
      this.$Alert("Error", '처리할 수 없는 요청입니다. [ '+url+' ]');
      return {
        returnCode: 'F',
        errorMessage: '처리할 수 없는 요청입니다.'
      };
    }
  },

  async ApiDelete(url, data) {
    if (process.env.DEBUG_MODE) {
      console.log('[ApiDelete] REQ ', url, data)
    }
    try {
      /** POST Request */
      let response = await axiosInstanceCredentials.delete(url, data)
      if (process.env.DEBUG_MODE) {
        console.log('[ApiDelete] => RES ', response);
      }
      if (response) {
        if (response.data.returnCode == 'S') {
          return response;
        } else {
          if (process.env.DEBUG_MODE) {
            this.$Alert("Error", response.data.errorMessage +'('+ response.data.errorCode +')');
          } else {
            this.$Alert("Error", response.data.errorMessage);
          }
          return response;
        }
      } else {
        this.$Alert("Error", '데이터를 처리하지 못했습니다. [ '+url+' ]');
        return {
           returnCode: 'F',
           errorMessage: '데이터를 처리하지 못했습니다.'
        };
      }
    } catch (error) {
      //console.log(error);
      this.$Alert("Error", '처리할 수 없는 요청입니다. [ '+url+' ]');
      return {
        returnCode: 'F',
        errorMessage: '처리할 수 없는 요청입니다.'
      };
    }
  },

}

export default {
  methods
}

Vue.prototype.$ApiGet = methods.ApiGet;
Vue.prototype.$ApiGetByData = methods.ApiGetByData;
Vue.prototype.$ApiPost = methods.ApiPost;
Vue.prototype.$ApiPostForm = methods.ApiPostForm;
Vue.prototype.$ApiPut = methods.ApiPut;
Vue.prototype.$ApiDelete = methods.ApiDelete;

