<template>
  <div>
    <sidenav></sidenav>
    <div class="main-content">
      <div class="p-2 title" v-if="this.paramsId">Edit category</div>
      <div class="p-2 title" v-if="!this.paramsId">Create Category</div>
      <notifications group="foo" />
      <div class="createForms">
        <div class="row">
          <div class="col-md-6">
            <div class="createfields">
              <form name="category" class="form">
                <!-- category Name -->
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    id="name"
                    placeholder="Enter Your  Name"
                    v-model="category.name"
                    required
                  />
                  <div
                    class="error"
                    v-if="$v.category.name.$error && $v.category.$touch"
                  >
                    Name is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="catId">CategoryId</label>
                  <input
                    type="text"
                    name="catId"
                    class="form-control"
                    id="id"
                    placeholder="Enter Category Id"
                    v-model="category.catId"
                    required
                  />
                  <div
                    class="error"
                    v-if="$v.category.catId.$error && $v.category.$touch"
                  >
                    CategoryId is required
                  </div>
                </div>
                <!-- Save/Cancel -->
                <div class="d-flex justify-content-center">
                  <div class="p-2">
                    <b-button
                      class="btn btn-outline-default"
                      variant="success"
                      v-on:click="onSubmit(category)"
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
      category: {
        name: "",
        catId: ""
      },
      currentPage: "",
      totalCount: 0,
      perPage: 0,
      paramsId: ""
    };
  },

  validations: {
    category: {
      name: {
        required
      },
      catId: {
        required
      }
    }
  },
  created() {
    this.paramsId = this.$route.params.id;
    if (this.paramsId) {
      this.getOnecategory(this.paramsId);
    }
  },

  methods: {
    getOnecategory(id) {
      var formData = {};
      formData.id = id;
      service.getOneCategory(formData, data => {
        if (data) {
          this.category = data.data;
        }
      });
    },
    onSubmit(category) {
      console.log("category", category);

      this.$v.category.$touch();
      if (this.$v.category.$error) {
        return;
      } else {
        if (this.paramsId) {
          this.category.id = this.paramsId;
          service.editCategory(this.category, data => {
            if (data) {
              this.$notify({
                group: "foo",
                type: "success",
                title: "Success message",
                text: "category edited Successfully",
                duration: 1500
              });
              this.$router.push({ name: "categoryList" });
            } else if (data.status == 204) {
              this.$notify({
                group: "foo",
                type: "error",
                title: "Error message",
                text: "category edited Unsuccessfully"
              });
              // this.$router.push({name: "categoryList"});
            }
          });
          // this.$router.push("/categoryList");
        } else {
          service.saveCategory(this.category, data => {
            if (data.status == 200) {
              this.$notify({
                group: "foo",
                type: "success",
                title: "Success message",
                text: "category Saved Successfully",
                duration: 1500
              });
              // this.$router.push({name: "categoryList"});
            } else if (data.status == 200) {
              this.$notify({
                group: "foo",
                type: "error",
                title: "Error message",
                text: "category Save Unsuccessfully"
              });
              // this.$router.push({name: "categoryList"});
            }
            this.$router.push("categoryList");
          });
        }
      }
    },
    cancel() {
      this.$router.push({
        name: "categoryList"
      });
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/scss/main.scss";
</style>
