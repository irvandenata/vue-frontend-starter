<template>
  <div class="container p-2 bg-light pb-4">
    <div class="row mt-4 mb-2 bg-light justify-content-between mx-4">
      <div class="col-3">
        <h4>{{ $route.meta.name }}</h4>
      </div>
      <div class="col-3 mr-0 text-end">
        <div class="btn btn-md btn-warning px-4 mx-2" v-on:click="refresh">
          Refresh
        </div>

        <div
          class="btn btn-md btn-success px-4"
          data-bs-toggle="modal"
          data-bs-target="#Modal"
          v-on:click="create"
        >
          Create
        </div>
      </div>
    </div>

    <div v-if="render" class="row bg-light justify-content-center mt-2 mx-4">
      <div class="col-12 bg-light bg-white p-4 rounded">
        <TableData
          v-if="render"
          :columns="datas.columns"
          :entries="datas.entries"
          :get="get"
          :destroy="destroyItem"
        />
      </div>
    </div>
    <div style="height: 400px" class="d-flex" v-else>
      <div class="my-auto mx-auto text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  <modal-component>
    <template v-slot:title>
      <h5 class="modal-title" id="ModalLabel">{{ title }} Category</h5>
    </template>

    <form method="PATCH" @submit.prevent="send">
      <div class="form-group">
        <label for="exampleInputEmail1">Name Category</label>
        <input
          type="text"
          class="form-control"
          v-model="form.data.name"
          placeholder="Enter name"
        />
        <input
          type="hidden"
          class="form-control"
          v-model="form.data.slug"
          placeholder="Enter name"
        />
      </div>
      <div class="d-flex mt-2 flex-row-reverse">
        <button
          type="button"
          class="btn btn-secondary m-1"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          data-bs-dismiss="modal"
          type="submit"
          class="btn btn-primary m-1"
        >
          Save
        </button>
      </div>
    </form>
  </modal-component>
</template>

<script >
import TableData from "../../../components/table/TableData.vue";
import Modal from "../../../components/ModalTemplate.vue";
import { reactive, ref } from "vue";
import {
  showCategory,
  createCategory,
  editCategory,
  destroyCategory,
} from "../../../composables/admin/category";
import { useStore } from "vuex";
export default {
  components: {
    TableData,
    "modal-component": Modal,
  },
  setup() {
    const statusForm = ref("create");
    const form = reactive({
      data: {},
    });
    const title = ref("create");
    const store = useStore();
    const { getAllCategory, datas, render } = showCategory(store);
    const { submit } = createCategory(store);
    const { getData, update } = editCategory(store);
    const { destroy } = destroyCategory(store);

    getAllCategory();
    const refresh = async () => {
      render.value = false;
      await getAllCategory();
      render.value = true;
    };

    const create = () => {
      Object.keys(form.data).map(function (objectKey) {
        form.data[objectKey] = "";
      });

      statusForm.value = "create";
      title.value = "Create";
    };

    const send = async () => {
      if (statusForm.value == "create") await submit(form.data);
      else await update(form.data);
      await refresh();
    };
    const destroyItem = async (item) => {
      const res = await destroy(item);
      console.log(res);
      if (res) await refresh();
    };

    const get = async (item) => {
      statusForm.value = "update";
      title.value = "Edit";
      const r = await getData(item.data.slug);
      Object.keys(r.data.attributes).map(function (objectKey) {
        form.data[objectKey] = r.data.attributes[objectKey];
      });
    };

    return {
      submit,
      get,
      create,
      getAllCategory,
      datas,
      form,
      send,
      render,
      refresh,
      title,
      destroyItem,
    };
  },
};
</script>

<style>
</style>