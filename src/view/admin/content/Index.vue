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
          v-if="btnCreate"
          v-on:click="create"
        >
          Create
        </div>
      </div>
    </div>

    <div
      v-if="render == 'index'"
      class="row bg-light justify-content-center mt-2 mx-4"
    >
      <div class="col-12 bg-light bg-white p-4 rounded">
        <TableContent
          v-if="render"
          :columns="datas.columns"
          :entries="datas.entries"
          :get="get"
          :destroy="destroyItem"
        />
      </div>
    </div>
    <div
      v-else-if="render == 'create'"
      class="row bg-light justify-content-center mt-2 mx-4"
    >
      <div class="col-12 bg-light bg-white p-4 rounded">
        <form method="PATCH" @submit.prevent="send">
          <div class="row">
            <div class="col-8 mb-2">
              <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.data.title"
                  placeholder="Enter Title"
                  required
                />
                <input
                  type="hidden"
                  class="form-control"
                  v-model="form.data.slug"
                />
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="form-group">
                <div class="row justify-content-center mt-3">
                  <button
                    class="col-5 btn btn-warning m-1"
                    v-on:click="form.data.status = 0"
                    type="submit"
                  >
                    Draft
                  </button>
                  <button
                    class="col-5 btn btn-success m-1"
                    v-on:click="form.data.status = 1"
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div class="col-9">
              <VueEditor
                :editorToolbar="customToolbar"
                v-model="form.data.body"
              />
            </div>
            <div class="col-3">
              <div class="form-group">
                <label>Category</label>
                <Multiselect
                  v-model="form.data.category_id"
                  label="name"
                  :options="select.category"
                  ref="multiselect"
                  required
                >
                  <template v-slot:singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      {{ value.name }}
                    </div>
                  </template>

                  <template v-slot:option="{ option }">
                    {{ option.name }}
                  </template>
                </Multiselect>
              </div>
              <div class="form-group">
                <label>Tag</label>
                <Multiselect
                  v-model="form.data.tags"
                  label="name"
                  :options="select.tag"
                  mode="tags"
                  :closeOnSelect="false"
                  :searchable="true"
                >
                  <template v-slot:singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      {{ value.name }}
                    </div>
                  </template>

                  <template v-slot:option="{ option }">
                    {{ option.name }}
                  </template>
                </Multiselect>
              </div>
            </div>
          </div>
        </form>
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

  <modal-component :size="sizeModal">
    <template v-slot:title>
      <h5 class="modal-title" id="ModalLabel">
        {{ title }} {{ $route.meta.name }}
      </h5>
    </template>

    <form method="PATCH" @submit.prevent="send">
      <div class="form-group">
        <label for="exampleInputEmail1">Name {{ $route.meta.name }}</label>
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

<script>
import TableContent from "../../../components/table/TableContent.vue";
import Modal from "../../../components/ModalTemplate.vue";
import Multiselect from "@vueform/multiselect";
import { showCategory } from "../../../composables/admin/category";
import { showTag } from "../../../composables/admin/tag";
import { reactive, ref } from "vue";
import { VueEditor } from "vue3-editor";
import {
  showContent,
  createContent,
  editContent,
  destroyContent,
} from "../../../composables/admin/content";
import { useStore } from "vuex";
export default {
  components: {
    TableContent,
    "modal-component": Modal,
    Multiselect,
    VueEditor,
  },
  setup() {
    const btnCreate = ref(true);
    const sizeModal = "modal-xl";
    const statusForm = ref("create");
    const customToolbar = [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ["clean"], // remove formatting button
    ];
    const form = reactive({
      data: {},
    });
    const title = ref("create");
    const select = reactive({
      category: [],
      tag: [],
    });
    const result = ref([]);
    const store = useStore();
    const { showAllCategory } = showCategory(store);
    const { showAllTag } = showTag(store);
    const { getAllContent, datas, render } = showContent(store);
    const { submit } = createContent(store);
    const { getData, update } = editContent(store);
    const { destroy } = destroyContent(store);

    getAllContent();
    const refresh = async () => {
      render.value = "";
      btnCreate.value = true;
      await getAllContent();
      render.value = "index";
    };

    const create = async () => {
      render.value = "";
      btnCreate.value = false;
      render.value = "create";
      form.data = {};
      form.data.slug = await submit();
      const resCategory = await showAllCategory();
      if (resCategory.length > 0) {
        select.category = await resCategory.map(function (value) {
          return {
            name: value.attributes.name,
            value: value.id,
          };
        });
      }

      const resTag = await showAllTag();
      if (resTag.length > 0) {
        select.tag = await resTag.map(function (value) {
          return {
            name: value.attributes.name,
            value: value.id,
          };
        });
      }
    };

    const send = async () => {
      await update(form.data);
      await refresh();
      form.data = {};
      statusForm.value = "create";
      btnCreate.value = true;
    };
    const destroyItem = async (item) => {
      const res = await destroy(item);
      if (res) await refresh();
    };

    const get = async (item) => {
      statusForm.value = "update";
      title.value = "Edit";
      btnCreate.value = false;
      const r = await getData(item.data.slug);
      Object.keys(r.data.attributes).map(function (objectKey) {
        form.data[objectKey] = r.data.attributes[objectKey];
      });
      form.data.tags =
        form.data.tags.length > 0
          ? form.data.tags.map(function (value) {
              return value.id;
            })
          : [];
      render.value = "";
      render.value = "create";
      const resCategory = await showAllCategory();
      if (resCategory.length > 0) {
        select.category = await resCategory.map(function (value) {
          return {
            name: value.attributes.name,
            value: value.id,
          };
        });
      }

      const resTag = await showAllTag();
      if (resTag.length > 0) {
        select.tag = await resTag.map(function (value) {
          return {
            name: value.attributes.name,
            value: value.id,
          };
        });
      }
    };

    return {
      submit,
      get,
      create,
      getAllContent,
      btnCreate,
      datas,
      sizeModal,
      result,
      form,
      send,
      render,
      refresh,
      title,
      select,
      customToolbar,
      destroyItem,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
