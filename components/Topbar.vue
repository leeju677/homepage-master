<script>
import { mapGetters } from 'vuex';

/**
 * Topbar component
 */
export default {
  data() {
    return {
      current_language: this.$i18n.locale,
      debubMode: false
    };
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
  },
  created() {
    this.debugMode = process.env.DEBUG_MODE;
  },
  mounted() {
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    /**
     * Toggle rightsidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    logoutUser() {
      if (process.env.auth === "firebase") {
        this.$store.dispatch("auth/logOut");
      } else if (process.env.auth === "fakebackend") {
        this.$store.dispatch("auth/logOut");
        //this.$store.dispatch("authfack/logout");
      }
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">

        <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
          id="vertical-menu-btn">
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown variant="white" class="d-inline-block d-lg-none ms-2" toggle-class="header-item noti-icon" right
          menu-class="dropdown-menu-lg p-0">
          <template v-slot:button-content>
            <i class="uil-search"></i>
          </template>
          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input type="text" class="form-control" :placeholder="$t('navbar.search.text')"
                  aria-label="Recipient's username" />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown>


        <b-dropdown class="d-inline-block" toggle-class="header-item" right variant="white"
          menu-class="dropdown-menu-end">
          <template v-slot:button-content>
            <img class="rounded-circle header-profile-user" :src="currentUser.profFileUrl" alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{{ currentUser.userNm }}</span>
            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
          </template>

          <nuxt-link :to="{ path: '/user/profile', query: { userId: currentUser.userId } }" class="dropdown-item d-block">
            <i class="uil uil-cog font-size-18 align-middle me-1 text-muted"></i>
            <span class="align-middle">Settings</span>
            <!-- <span class="badge bg-soft-success rounded-pill mt-1 ms-2">03</span> -->
          </nuxt-link>

          <a class="dropdown-item" @click="logoutUser" href="javascript: void(0);">
            <i class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span class="align-middle">Logout</span>
          </a>
        </b-dropdown>
        <div class="dropdown d-inline-block" v-if="debugMode == 'true'">
          <button type="button" class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="toggleRightSidebar">
            <i class="uil-cog toggle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
