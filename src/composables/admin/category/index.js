import { reactive, ref} from "vue";
import { useRouter } from "vue-router";
import { showLoading, hideLoading } from "../../../utils/overlayLoading";
import { toast,swalConfirm } from "../../../utils/sweatalert";

export function showCategory(store){
 const render = ref(false);
    const datas = reactive({
      columns: [],
      entries: [],
    });

    const getAllCategory = async () => {
      const router = useRouter()
     const headers = store.state.auth.headers
      const response = await store
        .dispatch("category/fetch",headers)
        .then(async (r) => {
          datas.entries = await r.data.map(function (value) {
            value.attributes = Object.assign({ No: "" }, value.attributes);
            return value.attributes;
          });
          datas.columns = await Object.keys(datas.entries[0]).map(function (
            value
          ) {
            return {
              data: value,
            };
          });
          render.value = true;
        })
        .catch((er) => {
          console.log(er);
          store.dispatch("auth/logout")
          .catch(() => {
          router.push({ name: "login" });
          });
          router.push({ name: "login" });
        });
      return response;
    };
    return {
     getAllCategory,
      datas,
      render,
    }
} 

export function createCategory(store){
 const submit = async (item) => {
     showLoading();
     if(item.slug == '' | item.slug ==undefined  ){
       await store
        .dispatch("category/create", item)
        .then(async () => {
          toast("Success Created!", "success");
        })
        .catch((er) => {
          console.log(er);
          hideLoading();
        });
     }   
      hideLoading();
    }

    return {
     submit
    }
}


export function editCategory(store){ 
const getData = async (slug) => {
     const result = reactive({
      data:''
     })
     await store
        .dispatch("category/get", slug)
        .then(async (r) => {
          result.data = r.data.data
        })
        .catch((er) => {
          console.log(er);
        });
       return result
}


 const update = async (item) => {
     showLoading();
     await store
        .dispatch("category/update",item)
        .then(async () => {
          toast("Success Updated!", "success");
        })
        .catch((er) => {
          console.log(er);
          hideLoading();
        });
      hideLoading();
    }

    return {
    update,
     getData
    }

}

export function destroyCategory(store){
 const destroy = async (item) =>{
    const status = ref(false)
    const confirm = await swalConfirm(status)
    if(confirm){
      await store
        .dispatch("category/destroy",item)
        .then(async () => {
         status.value = true
        })
        .catch((er) => {
          console.log(er);
        });
       }
       return status.value   
   }
   return {
  destroy
 }
}