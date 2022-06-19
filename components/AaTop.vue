<template>
  <div class="aa-top" :class="leftMenu?'active':''">
    <div class="top-bar">
      <div class="left">
        <div class="top-btn btn-ham" @click="toggleLeftMenu()">=</div>
      </div>
      <div class="right">
        <div class="top-btn"><nuxt-link to="/basket">장바구니</nuxt-link></div>
        <div class="top-btn"><nuxt-link to="/search">검색</nuxt-link></div>
      </div>
    </div>
    <div class="aside-menu">
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return { 
        leftMenu: false,
      }
    },
    methods: {
      toggleLeftMenu() {
        this.leftMenu = !this.leftMenu;
      }
    }
  };
</script>
  
<style lang="scss" scoped>
  .aa-top {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    .top-bar {
      display: flex;
      justify-content: space-between;
      background-color: rgba(255,255,255,0.6);
      .top-btn {
        padding: 10px;
      }
      .left {
      }
      .right {
        display: flex;
      }
    }
    .aside-menu {
      position: absolute;
      top: 0;
      left: -200px;
      width: 200px;
      height: 100vh;
      background-color: #fff;
      ul {
        padding: 0;
        margin: 0;
        li {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
      }
    }
  }
  .aa-top.active {
    left: 200px;
  }

</style>