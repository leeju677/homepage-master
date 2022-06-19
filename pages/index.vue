<template>
  <div class="aa-home">
    <tabs :tabs="tabs" class="tab-container">
      <div>알찬화요일 contents</div>
      <div>베스트</div>
      <div>알찬연구소</div>
    </tabs>
  </div>
</template>

<script>
import Tabs from "vue-slide-tabs";

export default {
  components: {
    Tabs
  },
  head() {
    return {
      title: `${this.title} | 알찬상회`,
    };
  },
  data() {
    return {
      tabs: [
        {
          label: "알찬화요일 tab"
        },
        {
          label: "베스트"
        },
        {
          label: "알찬연구소"
        }
      ]
    };
  },
  middleware: "authentication",
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
  .aa-home {
    background-image: url('@/assets/images/bibim.jpg');
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
    padding-top: 40px;
  }
  .tab-container {
    margin-top: 300px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    height: calc(100vh - 40px);
    .tab-bar {
      border-bottom: 1px solid #eee;
      display: flex;
      .tab {
        padding: 10px 20px ;
      }
    }
  }
</style>
