<template>
  <div>

    <div class="aside">
.      <AaAside></AaAside>
    </div>

    <div class="container">
      <AaTop></AaTop>
      <div class="contents">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import AaAside from "@/components/AaAside.vue";
import AaTop from "@/components/AaTop.vue";

export default {
  components: {
    AaAside,
    AaTop
  },
  mounted() {
    document.body.classList.add("homepage-bg");
  }
};
</script>

<style lang="scss" scoped>
  .aside {
    position: fixed;
    width: 600px;
    height: 100vh;
    overflow-y: auto;
    top: 0;
    left: calc(50% - 600px);
    background-color: #fff;
  }
  .container {
    position: fixed;
    width: 600px;
    height: 100vh;
    overflow-y: auto;
    top: 0;
    left: calc(50% + 10px);
    padding: 0;
    background-color: #eee;
    box-shadow: 0px 0px 10px 5px rgba(100,100,100,0.2);
  }
  @media (max-width: 400px) { 
    .aside {
      display: none;
    }
    .container {
      width: 100%;
      left: 0;
    }
  }
</style>
