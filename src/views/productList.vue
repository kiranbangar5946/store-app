<template>
  <div class="project-list">
    <sidenav></sidenav>
    <div class="main-content">
      <div class="d-flex bd-highlight mb-3 white mr-5">
        <div class="p-2 title">Product List</div>
        <div class="ml-auto bd-highlight d-flex">
          <div class="pt-3 ml-2">
            <router-link
              to="createProduct"
              class="btn btn-outline-success"
              v-b-tooltip.hover
              title="Create"
            >
              Create Product
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
            <tr v-if="!allProductList.length">
              <td colspan="7">
                <b-spinner v-if="loader"></b-spinner>
                <div
                  class="justify-content-md-center text-blue text-center"
                  v-else-if="!dataFound"
                >
                  No Product found
                </div>
              </td>
            </tr>
            <tr
              class="black"
              v-for="(product, $index) in allProductList"
              v-bind:key="product.key"
            >
              <td width="10px;">
                {{ $index + 1 + (formData.page - 1) * perPage }}
              </td>
              <td class="text-capitalize">{{ product.name }}</td>
              <td ng-if="product.categoryId.name " class="text-capitalize">
                {{ product.categoryId.name }}
              </td>

              <td class="text-capitalize">{{ product.productId }}</td>

              <td width="40px;">
                <div class="p-1">
                  <router-link
                    :to="{ name: 'editProduct', params: { id: product._id } }"
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
                    @click="deleteOneProduct(product)"
                    title="Delete"
                  >
                    <font-awesome-icon icon="trash" />
                  </b-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="project-list-pagination d-flex justify-content-end mr-5">
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
          tableHeaderName: "Category",
          key: "key1"
        },
        {
          tableHeaderName: "ProductId",
          key: "key1"
        },
        {
          tableHeaderName: "Action",
          key: "key1"
        }
      ],
      allProductList: []
    };
  },

  created() {
    this.viewproduct(this.currentPage);
  },
  methods: {
    viewproduct(page) {
      this.formData.currentPage = page;
      this.formData.page = page;
      this.formData.name = this.searchText;
      this.loader = true;
      service.getAllproduct(this.formData, data => {
        if (data.data.data) {
          this.allProductList = data.data.data;
          this.totalCount = data.data.TotalCount;
          this.perPage = data.data.count;
          this.loader = false;
          this.dataFound = true;
        } else if (data.data == 204 && page > 1) {
          this.goToPage(page - 1);
        } else if (data.data == 204 && page == 1) {
          this.loader = false;
          this.dataFound = false;
        }
      });
    },
    goToPage(page) {
      this.$router.push({
        name: "productList"
      });
      this.viewproduct(page);
    },
    deleteOneProduct(product) {
      service.deleteOneProduct(product, data => {
        if (data.data.deletedCount) {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Success message",
            text: "Data deleted Successfully",
            duration: 1500
          });
          this.viewproduct(this.currentPage);
        } else {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error message",
            text: "Data deleted Unsuccessfully"
          });
          this.$router.push("/productList");
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
