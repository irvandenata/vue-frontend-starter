<template>
  <router-view></router-view>
</template>

<script>
import { provide } from "vue";
import store from "@/store";

export default {
  name: "App",
  setup() {
    provide("store", store);
  },
};
</script>

<style>
.space-l2 {
  margin-left: 10px;
}
.bg-gray {
  background-color: #f6f8fd;
}
</style>
