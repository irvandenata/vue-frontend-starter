<template>
  <div class="container p-2">
    <div class="row m-0">
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Content</h5>
            <h3 class="card-text">
              <span class="badge bg-primary badge-danger">{{
                data.content
              }}</span>
            </h3>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Category</h5>
            <h3 class="card-text">
              <span class="badge bg-primary badge-danger">{{
                data.category
              }}</span>
            </h3>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Tag</h5>
            <h3 class="card-text">
              <span class="badge bg-primary badge-danger">{{ data.tag }}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { showLoading, hideLoading } from "../../utils/overlayLoading";
import { toast } from "../../utils/sweatalert";
import { showCategory } from "../../composables/admin/category";
import { showTag } from "../../composables/admin/tag";
import { showContent } from "../../composables/admin/content";
export default {
  setup() {
    const store = inject("store");
    const router = useRouter();
    const data = reactive({});
    const { showAllCategory } = showCategory(store);
    const { showAllTag } = showTag(store);
    const { getAllContent } = showContent(store);
    onMounted(async () => {
      const resCategory = await showAllCategory();
      const resTag = await showAllTag();
      const resContent = await showAllTag();
      data.category = resCategory.length;
      data.tag = resTag.length;
      data.content = resContent.length;

      console.log(data);
    });

    const logout = async () => {
      showLoading();
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.state.auth.token,
      };
      await store.dispatch("auth/logout", headers).then(() => {
        toast("Sign Out Success!", "success");
      });
      router.push({ name: "login" });
      hideLoading();
    };
    const me = async () => {
      await axios.get("http://portoweb-backend-starter.test/status", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + store.state.auth.token,
        },
      });
    };
    return {
      store,
      me,
      logout,
      data,
      showAllCategory,
      showAllTag,
      getAllContent,
    };
  },
};
</script>

<style lang="scss"></style>
