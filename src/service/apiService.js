import axios from "axios";

var adminUrl = "http://localhost:4000/";
export default {
  getAllCategory: (data, callback) => {
    return axios
      .post(adminUrl + "Category/getAll", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  getAllproduct: (data, callback) => {
    return axios
      .post(adminUrl + "Product/getAllProducts", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  saveCategory: (data, callback) => {
    return axios
      .post(adminUrl + "Category/createCategory", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  saveProduct: (data, callback) => {
    return axios
      .post(adminUrl + "Category/createProduct", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  getCategoryList: callback => {
    return axios
      .get(adminUrl + "Category/getCategoryList")
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  getProduct: (data, callback) => {
    return axios
      .post(adminUrl + "Product/getProduct", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  getOneCategory: (data, callback) => {
    return axios
      .post(adminUrl + "Product/getCategory", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  editProduct: (data, callback) => {
    return axios
      .post(adminUrl + "Product/updateProduct", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  editCategory: (data, callback) => {
    return axios
      .post(adminUrl + "Product/updateCategory", data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteOneCategory: (data, callback) => {
    return axios
      .delete(adminUrl + "Category/deleteCategory/" + data._id, {
        params: {
          id: `${data._id}`
        }
      })
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteOneProduct: (data, callback) => {
    return axios
      .delete(adminUrl + "Product/deleteProduct/" + data._id, {
        params: {
          id: `${data._id}`
        }
      })
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  }
};
