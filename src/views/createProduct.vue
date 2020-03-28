<template>
  <div>
    <sidenav></sidenav>
    <div class="main-content">
      <div class="p-2 title" v-if="this.paramsId">Edit product</div>
      <div class="p-2 title" v-if="!this.paramsId">Create product</div>
      <notifications group="foo" />
      <div class="createForms">
        <div class="row">
          <div class="col-md-6">
            <div class="createfields">
              <form name="product" class="form">
                <!-- product Name -->
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    id="name"
                    placeholder="Enter Your  Name"
                    v-model="product.name"
                    required
                  />
                  <div
                    class="error"
                    v-if="$v.product.name.$error && $v.product.$touch"
                  >
                    Name is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="productId">ProductId</label>
                  <input
                    type="text"
                    name="productId"
                    class="form-control"
                    id="id"
                    placeholder="Enter Product Id"
                    v-model="product.productId"
                    required
                  />
                  <div
                    class="error"
                    v-if="$v.product.productId.$error && $v.product.$touch"
                  >
                    ProductId is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="project">Select Category</label>
                  <select
                    class="form-control"
                    type="text"
                    id="project"
                    v-model="product.categoryId"
                  >
                    <option
                      :value="allCategory._id"
                      :key="allCategory._id"
                      v-for="allCategory in allCategoryList"
                      >{{ allCategory.name }}</option
                    >
                  </select>
                </div>

                <!-- Save/Cancel -->
                <div class="d-flex justify-content-center">
                  <div class="p-2">
                    <b-button
                      class="btn btn-outline-default"
                      variant="success"
                      v-on:click="onSubmit(product)"
                      >Save</b-button
                    >
                  </div>
                  <div class="p-2">
                    <b-button
                      class="btn btn-outline-default"
                      v-on:click="cancel()"
                      variant="danger"
                      >Cancel</b-button
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import sidenav from "@/components/sidenav.vue";
import service from "@/service/apiService.js";

export default {
  components: {
    sidenav
  },
  data() {
    return {
      product: {
        name: "",
        categoryId: "",
        productId: ""
      },
      currentPage: "",
      totalCount: 0,
      perPage: 0,
      paramsId: "",
      allCategoryList: []
    };
  },

  validations: {
    product: {
      name: {
        required
      },
      productId: {
        required
      }
    }
  },
  created() {
    this.paramsId = this.$route.params.id;
    if (this.paramsId) {
      this.getOneproduct(this.paramsId);
    }
    this.getCategoryList();
  },

  methods: {
    getCategoryList() {
      service.getCategoryList(data => {
        if (data.status == 200) {
          this.allCategoryList = data.data;
        } else {
          this.allCategoryList = "No Category";
        }
      });
    },

    getOneproduct(id) {
      var formData = {};
      formData.id = id;
      service.getProduct(formData, data => {
        if (data) {
          this.product = data.data;
        }
      });
    },
    onSubmit(product) {
      console.log("product", product);
      this.$v.product.$touch();
      if (this.$v.product.$error) {
        return;
      } else {
        if (this.paramsId) {
          this.product.id = this.paramsId;
          service.editProduct(this.product, data => {
            if (data.status == 200) {
              this.$notify({
                group: "foo",
                type: "success",
                title: "Success message",
                text: "product edited Successfully",
                duration: 1500
              });
              // this.$router.push({name: "productList"});
            } else if (data.status == 204) {
              this.$notify({
                group: "foo",
                type: "error",
                title: "Error message",
                text: "product edited Unsuccessfully"
              });
              // this.$router.push({name: "productList"});
            }
          });
          // this.$router.push("/productList");
        } else {
          service.saveProduct(this.product, data => {
            if (data.status == 200) {
              this.$notify({
                group: "foo",
                type: "success",
                title: "Success message",
                text: "product Saved Successfully",
                duration: 1500
              });
              // this.$router.push({name: "productList"});
            } else if (data.status == 200) {
              this.$notify({
                group: "foo",
                type: "error",
                title: "Error message",
                text: "product Save Unsuccessfully"
              });
              // this.$router.push({name: "productList"});
            }
          });
          this.$router.push("productList");
        }
      }
    },
    cancel() {
      this.$router.push({
        name: "productList"
      });
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/scss/main.scss";
</style>
