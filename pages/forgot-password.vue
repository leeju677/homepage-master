<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Forgot Password component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `Forgot Password | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      title: "Recoverpwd",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.auth === "firebase") {
          this.tryingToReset = true;
          // Reset the authError if it existed.
          this.error = null;
          return (
            this.$store
              .dispatch("auth/resetPassword", {
                email: this.email,
              })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToReset = false;
                this.isResetError = false;
              })
              .catch((error) => {
                this.tryingToReset = false;
                this.error = error ? error : "";
                this.isResetError = true;
              })
          );
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
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div>
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
              <div class="card">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">비밀번호 초기화</h5>
                    <p class="text-muted">Reset Password with BEEABLE.</p>
                  </div>
                  <div class="p-2 mt-4">
                    <div
                      class="alert alert-success text-center mb-4"
                      role="alert"
                    >
                      이메일로 비밀번호 초기화 코드를 발송합니다.
                    </div>
                    <form @submit.prevent="tryToReset">
                      <div class="mb-3">
                        <label for="useremail">Email</label>
                        <input
                          type="email"
                          v-model="email"
                          class="form-control"
                          id="useremail"
                          placeholder="Enter email"
                          :class="{
                            'is-invalid': submitted && $v.email.$error,
                          }"
                        />
                        <div
                          v-if="submitted && $v.email.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.email.required"
                            >이메일을 입력해주세요.</span
                          >
                          <span v-if="!$v.email.email"
                            >올바르지 않은 이메일입니다.</span
                          >
                        </div>
                      </div>
                      <div class="form-group row mb-0">
                        <div class="col-12 text-end">
                          <button class="btn btn-primary w-sm" type="submit">
                            비밀번호 초기화
                          </button>
                        </div>
                      </div>
                      <div class="mt-4 text-center">
                        <p class="mb-0">
                          비밀번호가 기억나시나요?
                          <nuxt-link
                            to="/login"
                            class="fw-medium text-primary"
                            >Signin</nuxt-link
                          >
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->

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
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss" module></style>
