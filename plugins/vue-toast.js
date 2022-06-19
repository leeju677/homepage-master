import Toasted from 'vue-toasted';
import Vue from 'vue'
Vue.use(Toasted);

// options to the toast
let defaultAction =  {
  text: "Cancel",
  onClick: (e, toastObject) => {
    toastObject.goAway(0);
  },
}
let error_option = {
  type : 'error',
  action : defaultAction,
  position: "top-center",
  fullWidth : true,
  duration : 3000
  //icon : 'error_outline'
};

let success_option = {
  type : 'success',
  action : defaultAction,
  position: "top-center",
  fullWidth : true,
  duration : 3000
  //icon : 'error_outline'
};

let info_option = {
  type : 'info',
  action : defaultAction,
  position: "top-center",
  fullWidth : true,
  duration : 3000
  //icon : 'error_outline'
}

Vue.toasted.register('global_toast_error',
    (payload) => {

      console.log(payload);
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Oops.. Something Went Wrong.."
        }

        // if there is a message show it with the message
        return payload.message;
    },
    error_option
)

Vue.toasted.register('global_toast_success',
    (payload) => {
        if(! payload.message) {
    	    return "Oops.. Something Went Wrong.."
        }
        return payload.message;
    },
    success_option
)

Vue.toasted.register('global_toast_info',
    (payload) => {
        if(! payload.message) {
    	    return "Oops.. Something Went Wrong.."
        }
        return payload.message;
    },
    info_option
)
