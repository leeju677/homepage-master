<template>
    <div class="daum-postcode">

        <div class="pop-daum" v-show="showPop">
            <div class="pop-daum-content">
                <vue-daum-postcode 
                    @load="postCodeLoad"
                    @search="postCodeSearch"
                    @complete="postCodeComplete"
                />
                <div class="pop-daum-tool">                    
                    <b-button type="button" size="sm" @click="popupShow(false)"><i class="uil-multiply"></i> 닫기</b-button>
                </div>
            </div>
        </div>

        <b-form-input 
            type="text"
            class="form-inline input-zonecode mb-2"
            v-model="zonecode"
            @click="popupShow(true)"
            readonly
        ></b-form-input>
        <b-button type="button" @click="popupShow(true)">검색</b-button>
    </div>
</template>

<script>
export default {
  props: {
    postcode: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
        showPop: false,
        address: '',
        zonecode: '',
    };
  },
  watch: {
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.postcode) {
        this.zonecode = this.postcode;
      }
    },
    popupShow(bool) {
        this.showPop = bool;
    },
    postCodeLoad(data) {
        console.log('postCodeLoad',data);
        let that = this;
        setTimeout(() => {
            that.setHeight();
        }, 1000);
    },
    postCodeSearch(data) {
        console.log('postCodeSearch',data);
        let that = this;
        setTimeout(() => {
            that.setHeight();
        }, 500);
    },
    postCodeComplete(data) {
        //console.log('postCodeComplete',data);
        /**
         * ---------data 샘플 ---------------------
         * address: "제주특별자치도 제주시 첨단로 242"
         * addressEnglish: "242, Cheomdan-ro, Jeju-si, Jeju-do, Korea"
         * addressType: "R"
         * apartment: "N"
         * autoJibunAddress: ""
         * autoJibunAddressEnglish: ""
         * autoRoadAddress: ""
         * autoRoadAddressEnglish: ""
         * bcode: "5011013600"
         * bname: "영평동"
         * bname1: ""
         * bname1English: ""
         * bname2: "영평동"
         * bname2English: "Yeongpyeong-dong"
         * bnameEnglish: "Yeongpyeong-dong"
         * buildingCode: "5011013600121810000000001"
         * buildingName: ""
         * hname: ""
         * jibunAddress: "제주특별자치도 제주시 영평동 2181"
         * jibunAddressEnglish: "2181, Yeongpyeong-dong, Jeju-si, Jeju-do, Korea"
         * noSelected: "N"
         * postcode: ""
         * postcode1: ""
         * postcode2: ""
         * postcodeSeq: ""
         * query: "제주 첨단로 242"
         * roadAddress: "제주특별자치도 제주시 첨단로 242"
         * roadAddressEnglish: "242, Cheomdan-ro, Jeju-si, Jeju-do, Korea"
         * roadname: "첨단로"
         * roadnameCode: "3349191"
         * roadnameEnglish: "Cheomdan-ro"
         * sido: "제주특별자치도"
         * sidoEnglish: "Jeju-do"
         * sigungu: "제주시"
         * sigunguCode: "50110"
         * sigunguEnglish: "Jeju-si"
         * userLanguageType: "K"
         * userSelectedType: "R"
         * zonecode: "63309"
         */
        this.zonecode = data.zonecode;

        if (data.userSelectedType === 'R') {
            this.$emit('getAddress', {
                address: data.roadAddress,
                addressEnglish: data.roadAddressEnglish,
                sido: data.sido,
                sigungu: data.sigungu,
                roadname: data.roadname,
                zonecode: data.zonecode
            });
        } else {
            this.$emit('getAddress', {
                address: data.jibunAddress,
                addressEnglish: data.jibunAddressEnglish,
                sido: data.sido,
                sigungu: data.sigungu,
                roadname: data.roadname,
                zonecode: data.zonecode
            });
        }
        this.popupShow(false);
    },
    setHeight() {
        //var popContainer = document.getElementsByClassName('vue-daum-postcode-container')[0];
        var popContainer = document.getElementsByClassName('vue-daum-postcode-container')[0];        
        popContainer.style.height = "590px";
        
    }
  },
};
</script>

<style lang="scss" scoped>
.daum-postcode {
    display: inline-block;
    .pop-daum {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);
        z-index: 1200;
        .pop-daum-content {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            width: 600px;
            margin: 100px auto;
            .pop-daum-tool {
                text-align: center;
            }
            .vue-daum-postcode {
                height: 600px;
                overflow-y: auto;
            }
        }
    }
    .input-zonecode {
        width: 123px;
    }
}
</style>