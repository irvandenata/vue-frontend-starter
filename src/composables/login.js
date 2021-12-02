import { ref, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { toast, swal } from "../utils/sweatalert";
import { showLoading, hideLoading } from "../utils/overlayLoading";

import AdminImage from "../assets/image/admin.png";

export default function login() {
    const router = useRouter();
    const pic = ref(null);
    const picUrl = ref(AdminImage);
    const store = inject("store");
    const form = reactive({
      email: "",
      password: "",
    });
    const showPassword = async () => {
      var x = document.getElementById("password");
      console.log(x);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    };
    const submit = async () => {
      showLoading();
      await store
        .dispatch("auth/login", form)
        .then(async () => {
          await toast("Signed in successfully", "success");
          router.push({ name: "admin.dashboard" });
        })
        .catch((er) => {
          console.log(er);
          swal("Akun Tidak Ditemukan!");
        });
      hideLoading();
    }

    return {
         pic,
      picUrl,
      showPassword,
      form,
      submit,
    }
}