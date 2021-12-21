import { reactive, ref} from "vue";
import { useRouter } from "vue-router";
import { showLoading, hideLoading } from "../../../utils/overlayLoading";
import { toast,swalConfirm } from "../../../utils/sweatalert";

export function showContent(store){
 const render = ref('');
    const datas = reactive({
      columns: [],
      entries: [],
    });

    const getAllContent = async () => {
     const router = useRouter()
     const headers = store.state.auth.headers
      const response = await store
        .dispatch("content/fetch",headers)
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
          render.value = 'index';
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
     getAllContent,
      datas,
      render,
    }
} 

export function createContent(store){
 const submit = async () => {
      const slug = ref(); 
      await store
        .dispatch("content/create")
        .then(async (r) => {
         slug.value= r.data.data.attributes.slug
         console.log(r.data.data)
        })
        .catch((er) => {
          console.log(er);
        });
        return slug;
    }

    return {
     submit
    }
}


export function editContent(store){ 
const getData = async (slug) => {
     const result = reactive({
      data:''
     })
     await store
        .dispatch("content/get", slug)
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
        .dispatch("content/update",item)
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
     getData,

    }

}

export function destroyContent(store){
 const destroy = async (item) =>{
    const status = ref(false)
    const confirm = await swalConfirm(status)
    if(confirm){
      await store
        .dispatch("content/destroy",item)
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