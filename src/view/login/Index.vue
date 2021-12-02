<template>
  <div class="container-fluid bg-gray h-100">
    <div class="row justify-content-center h-100">
      <div class="col-lg-7">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-6">
            <div class="text mb-4">
              <h3>Hy there !</h3>
              <h6>You must have an account for sign in</h6>
            </div>
            <div class="card mt-4 h-50 all-rounded border-0">
              <div class="card-body">
                <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input
                      type="email"
                      v-model="form.email"
                      id="email"
                      class="form-control my-2 form-rounded"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      v-model="form.password"
                      id="password"
                      class="form-control my-2 form-rounded"
                    />
                  </div>
                  <div class="form-group">
                    &nbsp;
                    <input
                      type="checkbox"
                      class="ml-2"
                      :onclick="showPassword"
                    />
                    &nbsp;
                    <label class="text ml-2">Show Password</label>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-rounded w-100 py-2 my-2"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 h-100 text-center bg-primary">
        <img
          class="img-responsive"
          style="width: 80%; margin-top: 170px"
          ref="pic"
          :src="picUrl"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import login from "../../composables/login";
export default {
  setup() {
    const { pic, picUrl, showPassword, form, submit } = login();
    return {
      pic,
      picUrl,
      showPassword,
      form,
      submit,
    };
  },
};
</script>

<style>
.form-rounded {
  border-radius: 0.8rem;
}
.btn-rounded {
  border-radius: 0.8rem;
}
.all-rounded {
  border-radius: 0.7rem;
}
body,
.full {
  height: 100% !important;
}
</style>