var keys = {37: 1, 38: 1, 39: 1, 40: 1};
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
  } catch(e) {
      console.log(e);
  }
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
var check = false;
var methods = {
    scrollToTop() {
        window.scrollTo(0,0);
    },

    getCheck(){
        return check;
    },

    setCheck(val){
        check = val;
    },

    scrollEnable(scroll){
        if(scroll === false) {
            this.disableScroll();
        } else {
            this.enableScroll();
        }
    },

    disableScroll() {
        // console.log(wheelEvent);
        try {
        window.addEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
        window.addEventListener('scroll', this.preventDefault, false); // older FF
        window.addEventListener('mousewheel', this.preventDefault, false); // modern desktop
        window.addEventListener('wheel', this.preventDefault, false); // modern desktop
        window.addEventListener('touchmove', this.preventDefault, false); // mobile
        window.addEventListener('keydown', this.preventDefaultForScrollKeys, false);
        } catch(e) {console.log(e);}
    },
//function (event) { event.preventDefault (); }, {passive: false}
     enableScroll() {
        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.removeEventListener('scroll', this.preventDefault, false); // older FF
        window.removeEventListener('mousewheel', this.preventDefault, false);
        window.addEventListener('wheel', this.preventDefault, false); // modern desktop
        window.removeEventListener('touchmove', this.preventDefault, false);
        window.removeEventListener('keydown', this.preventDefault, false);
    },


    preventDefault(e) {
        e.preventDefault();
        // e.stopPropagation();
        // return false;
    },
    preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
        }
    }



};

export default methods;
