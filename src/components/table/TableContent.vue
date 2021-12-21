<template>
  <table
    id="example"
    class="table table-striped table-bordered"
    style="width: 100%"
  >
    <thead>
      <tr>
        <th v-for="item in data.columns" :key="item">
          {{ item.data }}
        </th>
      </tr>
    </thead>
    <tbody></tbody>
    <tfoot>
      <tr>
        <th v-for="item in data.columns" :key="item">
          {{ item.data }}
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { onMounted, reactive } from "vue";
import $ from "jquery";
export default {
  name: "TableData",
  props: { columns: Object, entries: Object, get: Function, destroy: Function },
  setup(props) {
    const item = reactive({ data });
    const data = reactive({
      columns: props.columns,
      entries: props.entries,
    });
    const createTable = () => {
      var t = $("#example").DataTable({
        data: data.entries,
        columns: data.columns,
        lengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, "All"],
        ],
        columnDefs: [
          {
            searchable: false,
            orderable: false,
            targets: 0,
          },
          {
            targets: 1,
            render: function (data, type) {
              if (type === "display") {
                data =
                  data +
                  '<div class="links">' +
                  "<button  data-bs-toggle='modal' class='btn mb-1 btn-warning btn-sm'  id='edit'>Edit</button> " +
                  "<button id='destroy' class='btn btn-sm btn-danger'>Trash</button> " +
                  "</div>";
              }
              return data;
            },
          },
          {
            targets: 3,
            render: function (data, type, row) {
              if (type === "display") {
                data =
                  row.status == 1
                    ? "<div  class='btn btn-sm btn-success'>Publish</div> "
                    : "<div  class='btn btn-sm btn-secondary'>Draft</div> ";
              }
              return data;
            },
          },
          {
            targets: 2,
            render: function (data, type) {
              if (type === "display") {
                data =
                  data && data.length > 20
                    ? data.slice(0, 20).split(" ").slice(0, -1).join(" ") +
                      "..."
                    : data;
              }
              return data;
            },
          },
          {
            targets: 7,
            render: function (data, type) {
              if (type === "display") {
                data =
                  data.length > 0
                    ? data.map(function (value) {
                        return value.name + " ";
                      })
                    : "-";
              }
              return data;
            },
          },
        ],
        order: [[1, "asc"]],
      });
      $("#example tbody #edit").on("click", function () {
        var data = t.row($(this).parents("tr")).data();
        item.data = data;
        props.get(item);
      });
      $("#example tbody #destroy").on("click", function () {
        var data = t.row($(this).parents("tr")).data();
        item.data = data;
        props.destroy(item);
      });
      t.on("order.dt search.dt", function () {
        t.column(0, { search: "applied", order: "applied" })
          .nodes()
          .each(function (cell, i) {
            cell.innerHTML = i + 1;
          });
      }).draw();
    };

    onMounted(() => {
      createTable();
    });

    return {
      data,
      item,
    };
  },
};
</script>

<style></style>
