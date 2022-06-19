<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Register component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `Register | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      submitted: false,
      tryingToRegister: false,
      isRegisterError: false,
      title: "Register",
    };
  },
  validations: {
    user: {
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  methods: {
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.auth === "firebase") {
          this.tryingToRegister = true;
          // Reset the regError if it existed.
          this.regError = null;
          return (
            this.$store
              .dispatch("auth/register", {
                email: this.user.email,
                password: this.user.password,
              })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToRegister = false;
                this.isRegisterError = false;
                this.registerSuccess = true;
                if (this.registerSuccess) {
                  this.$router.push(
                    this.$route.query.redirectFrom || {
                      path: "/",
                    }
                  );
                }
              })
              .catch((error) => {
                this.tryingToRegister = false;
                this.regError = error ? error : "";
                this.isRegisterError = true;
              })
          );
        } else if (process.env.auth === "fakebackend") {
          const { email, username, password } = this.user;
          if (email && username && password) {
            this.$store.dispatch("authfack/registeruser", this.user);
          }
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <nuxt-link to="/" class="text-dark">
        <i class="mdi mdi-home-variant h2"></i>
      </nuxt-link>
    </div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <nuxt-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="~/assets/images/logo-beeable.png"
                  alt
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="~/assets/images/logo-beeable.png"
                  alt
                  height="22"
                  class="logo logo-light"
                />
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Register Account</h5>
                  <p class="text-muted">Get your BEEABLE CMS account now.</p>
                </div>
                <div class="p-2 mt-4">
                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>

                  <b-form @submit.prevent="tryToRegisterIn">
                    <b-form-group
                      id="email-group"
                      label="Username"
                      label-for="username"
                      class="mb-3"
                    >
                      <b-form-input
                        id="username"
                        v-model="user.username"
                        type="text"
                        placeholder="Enter username"
                        :class="{
                          'is-invalid': submitted && $v.user.username.$error,
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && !$v.user.username.required"
                        class="invalid-feedback"
                      >
                        이름을 입력하세요.
                      </div>
                    </b-form-group>

                    <b-form-group
                      id="fullname-group"
                      label="Email"
                      label-for="email"
                      class="mb-3"
                    >
                      <b-form-input
                        id="email"
                        v-model="user.email"
                        type="email"
                        placeholder="Enter email"
                        :class="{
                          'is-invalid': submitted && $v.user.email.$error,
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.user.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.user.email.required"
                          >이메일을 입력해주세요.</span
                        >
                        <span v-if="!$v.user.email.email"
                          >올바르지 않은 이메일입니다.</span
                        >
                      </div>
                    </b-form-group>

                    <b-form-group
                      id="password-group"
                      label="Password"
                      label-for="password"
                      class="mb-3"
                    >
                      <b-form-input
                        id="password"
                        v-model="user.password"
                        type="password"
                        placeholder="Enter password"
                        :class="{
                          'is-invalid': submitted && $v.user.password.$error,
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && !$v.user.password.required"
                        class="invalid-feedback"
                      >
                        비밀번호를 입력해주세요.
                      </div>
                    </b-form-group>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-terms-condition-check"
                      />
                      <label
                        class="form-check-label"
                        for="auth-terms-condition-check"
                        >
                        <a href="javascript: void(0);" class="text-dark">이용악관과 개인정보보호정책</a>
                        에 동의합니다.
                      </label>
                    </div>
                    <div class="mt-3 text-end">
                      <b-button type="submit" variant="primary" class="w-sm"
                        >Register</b-button
                      >
                    </div>

                    <div class="mt-4 text-center">
                      <div class="signin-other-title">
                        <h5 class="font-size-14 mb-3 title">Sign up using</h5>
                      </div>

                      <ul class="list-inline">
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-primary text-white border-primary"
                          >
                            <i class="mdi mdi-facebook"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-info text-white border-info"
                          >
                            <i class="mdi mdi-twitter"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-danger text-white border-danger"
                          >
                            <i class="mdi mdi-google"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="mt-4 text-center">
                      <p class="text-muted mb-0">
                        이미 계정을 가지고 계신가요?
                        <nuxt-link
                          to="/login"
                          class="fw-medium text-primary"
                          >Login</nuxt-link
                        >
                      </p>
                    </div>
                  </b-form>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
            <div class="mt-5 text-center">
              <p>
                2022 ©BEEABLE. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by Hiveworks
              </p>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss" module></style>
