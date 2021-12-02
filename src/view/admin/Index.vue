<template>
  <div class="container-fluid h-100 p-0">
    <nav>
      <div class="position-fixed bg-white w-100 shadow-sm p-1">
        <h3 class="my-2 mx-5">ADMIN</h3>
      </div>
      <div class="mb-4" style="height: 30px"></div>
    </nav>

    <div class="row h-100 m-0">
      <div class="col-lg-2 h-100 m-0 p-0">
        <div class="position-fixed h-100 p-4">
          <div class="d-flex flex-column flex-shrink-0 p-2 text-center">
            <ul class="nav nav-pills flex-column mb-auto">
              <li class="my-1">
                <router-link
                  :to="{ name: 'admin.dashboard' }"
                  class="nav-link link-dark"
                >
                  <i class="far fa-dashboard"></i>
                  <span class="space-l2">Dashboard</span>
                </router-link>
              </li>
              <li class="my-1">
                <router-link
                  :to="{ name: 'admin.category.index' }"
                  class="nav-link link-dark"
                >
                  <i class="far fa-list-alt"></i>
                  <span class="space-l2">Category</span>
                </router-link>
              </li>
            </ul>
            <hr />
            <div class="dropdown">
              <a
                href="#"
                class="
                  d-flex
                  align-items-center
                  link-dark
                  text-decoration-none
                  dropdown-toggle
                "
                id="dropdownUser2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  class="rounded-circle me-2"
                />
                <strong>mdo</strong>
              </a>
              <ul
                class="dropdown-menu text-small shadow"
                aria-labelledby="dropdownUser2"
              >
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" @click="me">me</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button class="dropdown-item" @click="logout">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-10 h-100 bg-light p-0">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../../composables/auth";
export default {
  setup() {
    const { logout, me, store } = auth();
    return {
      store,
      me,
      logout,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/_custom.scss";
</style>