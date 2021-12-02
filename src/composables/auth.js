import { inject } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { showLoading, hideLoading } from "../utils/overlayLoading";
import { toast } from "../utils/sweatalert";
export function auth(){
  const store = inject("store");
    const router = useRouter();
    const logout = async () => {
      showLoading();
      await store
        .dispatch("auth/logout")
        .then(() => {
          toast("Sign Out Success!", "success");
        })
        .catch((er) => {
          console.log(er.status);
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
    }
} 