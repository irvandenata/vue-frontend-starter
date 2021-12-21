import { reactive, ref} from "vue";
import { useRouter } from "vue-router";
import { showLoading, hideLoading } from "../../../utils/overlayLoading";
import { toast,swalConfirm } from "../../../utils/sweatalert";

export function showTag(store){
 const render = ref(false);
    const datas = reactive({
      columns: [],
      entries: [],
    });

    const getAllTag = async () => {
     
     const router = useRouter()
     const headers = store.state.auth.headers
      const response = await store
        .dispatch("tag/fetch",headers)
        .then(async (r) => {
         if(r.data.length >0){ 
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
          });}
         
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
     const showAllTag = async () => {
     
     const router = useRouter()
     const headers = store.state.auth.headers
      const response = await store
        .dispatch("tag/fetch",headers)
        .catch((er) => {
          console.log(er);
          store.dispatch("auth/logout")
          .catch(() => {
          router.push({ name: "login" });
          });
          router.push({ name: "login" });
        });
      return response.data;
    };
    return {
     getAllTag,
     showAllTag,
      datas,
      render,
    }
} 

export function createTag(store){
 const submit = async (item) => {
     showLoading();
     if(item.slug == '' | item.slug ==undefined  ){
       await store
        .dispatch("tag/create", item)
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


export function editTag(store){ 
const getData = async (slug) => {
     const result = reactive({
      data:''
     })
     await store
        .dispatch("tag/get", slug)
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
        .dispatch("tag/update",item)
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

export function destroyTag(store){
 const destroy = async (item) =>{
    const status = ref(false)
    const confirm = await swalConfirm(status)
    if(confirm){
      await store
        .dispatch("tag/destroy",item)
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