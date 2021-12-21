<template>
  <div class="container-fluid h-100 p-0">
    <div class="row h-100 m-0">
      <div class="sidebar col-lg-2 m-0 p-4">
        <div class="position-fixed">
          <div class="text-center mt-5">
            <h4 class="text-white">Qude-X</h4>
          </div>

          <div class="p-2">
            <ul class="nav flex-column py-4">
              <li class="nav-item my-1" v-on:click="click2('dashboard')">
                <router-link
                  class="nav-link"
                  :class="dropdown.active == 'dashboard' ? 'active' : ''"
                  :to="{ name: 'admin.dashboard' }"
                >
                  <span class="p-1"><i class="fas fa-home fa-lg"></i></span>
                  Dashboard</router-link
                >
              </li>
              <li
                class="nav-item my-1 has-submenu"
                :class="dropdown.active == 'post' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  :class="dropdown.active == 'post' ? 'active' : ''"
                  v-on:click="click('post')"
                  ><span class="m-2"
                    ><i class="fas fa-sticky-note fa-lg"></i
                  ></span>
                  Post</a
                >
                <ul
                  class="submenu"
                  style="padding-left: 10px !important"
                  :class="dropdown.collapse"
                  id="collapseExample"
                >
                  <li>
                    <router-link
                      :to="{ name: 'admin.content.index' }"
                      class="nav-link"
                      href="#"
                      ><span class="p-1"
                        ><i class="far fa-circle mr10"></i></span
                      >Content
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="{ name: 'admin.tag.index' }"
                      class="nav-link"
                      href="#"
                      ><span class="p-1"
                        ><i class="far fa-circle mr10"></i></span
                      >Tag
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="{ name: 'admin.category.index' }"
                      class="nav-link"
                      href="#"
                      ><span class="p-1"
                        ><i class="far fa-circle mr10"></i></span
                      >Category
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-10 h-100 bg-light p-0" style="height: 100% !important">
        <nav>
          <div class="position-fixed bg-white w-100 shadow-sm p-1">
            <div class="row justify-content-end">
              <div class="col-4 ml-4">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Settings
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" v-on:click="logout" href="#"
                        >Logout</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4" style="height: 30px"></div>
        </nav>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { auth } from "../../composables/auth";
import { useRoute } from "vue-router";
export default {
  setup() {
    const dropdown = reactive({
      collapse: "collapse",
      active: "active",
    });
    const route = useRoute();
    const click = (item) => {
      if (dropdown.collapse == "collapse") {
        dropdown.collapse = "collapsed";
        dropdown.active = item;
      } else {
        dropdown.collapse = "collapse";
        dropdown.active = "";
      }
    };

    const click2 = (item) => {
      dropdown.collapse = "collapse";
      dropdown.active = item;
    };
    const { logout, me, store } = auth();

    if (
      route.meta.name == "TAG" ||
      route.meta.name == "CATEGORY" ||
      route.meta.name == "CONTENT"
    ) {
      dropdown.collapse = "collapsed";
      dropdown.active = "post";
    }
    return {
      store,
      me,
      logout,
      click2,
      click,
      dropdown,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/_custom.scss";
ul {
  list-style-type: none;
}

li .sub .active {
  border-radius: 5px;
  color: rgb(27, 27, 27);
}

.has-submenu.active {
  background-color: white;
  border-radius: 5px;
}
.submenu > li > .nav-link.active {
  color: rgb(29, 29, 29);
}

.has-submenu > .nav-link.active {
  color: #1f75ff;
}

.submenu > li > .nav-link {
  color: rgb(192, 192, 192);
  border-radius: 5px;
}

.mr10 {
  margin-right: 10px !important;
}

.nav-link {
  color: rgb(243, 243, 243);
  cursor: pointer;
  font-weight: 500 !important;
  border-radius: 5px;
}

.nav-link.active {
  color: #1f75ff;
  cursor: pointer;
  font-weight: 500 !important;
  background-color: white;
  border-radius: 5px;
}
.sidebar {
  background-color: #1f75ff;
}
</style>
