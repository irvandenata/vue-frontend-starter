<template>
  <div class="container p-2">
    <div class="row justify-content-center m-0">
      <div class="col-12">dashboard</div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { showLoading, hideLoading } from "../../utils/overlayLoading";
import { toast } from "../../utils/sweatalert";
export default {
  setup() {
    const store = inject("store");
    const router = useRouter();
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
      const response = await axios.get(
        "http://portoweb-backend-starter.test/status",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.state.auth.token,
          },
        }
      );
      console.log(response);
    };
    return {
      store,
      me,
      logout,
    };
  },
};
</script>


<style lang="scss">
</style>