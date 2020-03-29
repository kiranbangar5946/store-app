<template>
  <div class="project-list">
    <sidenav></sidenav>
    <div class="main-content">
      <div class="d-flex bd-highlight mb-3 white mr-5">
        <div class="p-2 title">Category List</div>
        <div class="ml-auto bd-highlight d-flex">
          <div class="pt-3 ml-2">
            <router-link
              to="createCategory"
              class="btn btn-outline-success"
              v-b-tooltip.hover
              title="Create"
              >Create Category
            </router-link>
          </div>
        </div>
      </div>
      <div class="project-list-content">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th
                v-for="tableHeader in tableHeaders"
                v-bind:key="tableHeader.tableHeaderName"
              >
                {{ tableHeader.tableHeaderName }}
              </th>
            </tr>
          </thead>
          <tbody class="white">
            <tr v-if="!allCategoryList.length">
              <td colspan="7">
                <b-spinner v-if="loader"></b-spinner>
                <div
                  class="justify-content-md-center text-blue text-center"
                  v-else-if="!dataFound"
                >
                  No Categroy found
                </div>
              </td>
            </tr>
            <tr
              class="black"
              v-for="(category, $index) in allCategoryList"
              v-bind:key="category.key"
            >
              <td width="10px;">
                {{ $index + 1 + (formData.page - 1) * perPage }}
              </td>
              <td class="text-capitalize">{{ category.name }}</td>
              <td class="text-capitalize">{{ category.catId }}</td>

              <td width="40px;">
                <div class="action-btn d-flex">
                  <div class="p-1">
                    <router-link
                      :to="{
                        name: 'editCategory',
                        params: { id: category._id }
                      }"
                      append
                      class="btn btn-sm btn-outline-info"
                      title="Edit"
                    >
                      <font-awesome-icon icon="edit" />
                    </router-link>
                  </div>
                  <div class="p-1">
                    <b-button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteOneCategory(category)"
                      title="Delete"
                    >
                      <font-awesome-icon icon="trash" />
                    </b-button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="this.dataFound"
        class="project-list-pagination d-flex justify-content-end mr-5"
      >
        <b-pagination
          class="mb-0"
          align="center"
          v-model="currentPage"
          :total-rows="totalCount"
          :per-page="perPage"
          @input="goToPage(currentPage)"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import sidenav from "@/components/sidenav.vue";
import service from "@/service/apiService.js";

export default {
  components: {
    sidenav
  },
  data() {
    return {
      value: "",
      formData: {},
      page: "",
      dataFound: "",
      loader: "",
      currentPage: 1,
      totalCount: 0,
      perPage: 0,
      searchText: "",
      // formData: { page: 1, limit: 10 },
      tableHeaders: [
        {
          tableHeaderName: "#",
          key: "key1"
        },
        {
          tableHeaderName: "Name",
          key: "key1"
        },
        {
          tableHeaderName: "CategoryId",
          key: "key1"
        },
        {
          tableHeaderName: "Action",
          key: "key1"
        }
      ],
      allCategoryList: []
    };
  },

  created() {
    this.viewCategory(this.currentPage);
  },
  methods: {
    viewCategory(page) {
      this.formData.currentPage = page;
      this.formData.page = page;
      this.formData.name = this.searchText;
      this.loader = true;
      service.getAllCategory(this.formData, data => {
        if (data.data.data) {
          this.allCategoryList = data.data.data;
          this.totalCount = data.data.TotalCount;
          this.perPage = data.data.count;
          this.loader = false;
          this.dataFound = true;
        } else if (data.data == "No content" && page > 1) {
          this.goToPage(page - 1);
        } else if (data.data == "No content") {
          this.allCategoryList = [];

          this.loader = false;
          this.dataFound = false;
        }
      });
    },
    goToPage(page) {
      this.$router.push({
        name: "categoryList"
      });
      this.viewCategory(page);
    },
    deleteOneCategory(user) {
      service.deleteOneCategory(user, data => {
        if (data) {
          this.$toaster.success("Category Deleted successfully");

          this.viewCategory(this.currentPage);
        } else {
          this.$toaster.error("Product Deleted unsuccessfully");
          this.$router.push("/categoryList");
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/scss/main.scss";
.btn-secondary {
  background-color: $white;
}
</style>
