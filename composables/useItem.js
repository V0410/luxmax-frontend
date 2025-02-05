const useItem = () => {
  const file = (payload) => {
    return useCustomFetch(`/v1/file/`, payload.body);
  };
  const getFile = (id) => {
    return useCustomFetch(`/v1/file/${id}`, null, null, "GET");
  };
  const getUser = (id) => {
    return useCustomFetch(`/v1/user/${id}`, null, null, "GET");
  };
  const deleteFile = (id) => {
    return useCustomFetch(`/v1/file/${id}`, null, null, "DELETE");
  };
  const categories = (page, limit) => {
    return useCustomFetch(`/v1/category/`, null, "categories", "GET", {
      page,
      limit,
    });
  };
  const category = (slug) => {
    return useCustomFetch(`/v1/category/${slug}`, null, null, "GET");
  };
  const materials = (page, limit) => {
    return useCustomFetch(`/v1/material/`, null, "materials", "GET", {
      page,
      limit,
    });
  };
  const material = (slug) => {
    return useCustomFetch(`/v1/material/${slug}`, null, null, "GET");
  };
  const colors = () => {
    return useCustomFetch(`/v1/color/`, null, null, "GET");
  };
  const color = (slug) => {
    return useCustomFetch(`/v1/color/${slug}`, null, null, "GET");
  };
  const brands = (page, limit) => {
    return useCustomFetch(
      `/v1/brand/?page=${page}&limit=${limit}`,
      null,
      "brands",
      "GET"
    );
  };
  const brand = (slug) => {
    return useCustomFetch(`/v1/brand/${slug}`, null, null, "GET");
  };
  const createProduct = (payload) => {
    return useCustomFetch(`/v1/product/`, payload.body);
  };
  const products = (payload) => {
    return useCustomFetch(
      `/v1/product/`,
      null,
      "products",
      "GET",
      {
        price_to: payload.body.price_to,
        price_from: payload.body.price_from,
        materials: payload.body.Materials,
        colors: payload.body.Colors,
        brands: payload.body.brands,
        categories: payload.body.categories,
        page: payload.body.page,
        limit: payload.body.limit,
        mine: payload.body.mine,
        userId: payload.body.userId,
        q: payload.body.q,
      },
      false,
      true
    );
  };
  const product = (id) => {
    return useCustomFetch(
      `/v1/product/${id}/`,
      null,
      null,
      "GET",
      null,
      false,
      true
    );
  };
  const productPlans = (id) => {
    return useCustomFetch(`/v1/product/${id}/plans/`, null, null, "GET");
  };
  const productIdentify = (id) => {
    return useCustomFetch(`/v1/product/${id}/identify/`, null, null, "GET");
  };
  const editProduct = (id, payload) => {
    return useCustomFetch(`/v1/product/${id}/`, payload.body, null, "PATCH");
  };
  const problems = (page, limit, categories) => {
    return useCustomFetch(`/v1/problem/`, null, null, "GET", {
      page,
      limit,
      categories,
    });
  };
  const addProductProblem = (payload) => {
    return useCustomFetch(`/v1/productProblem/`, payload.body);
  };
  const addProductProblemBulk = (payload) => {
    return useCustomFetch(`/v1/productProblem/bulk/`, payload.body);
  };
  const productProblem = (id) => {
    return useCustomFetch(`/v1/productProblem/${id}/`, null, null, "GET");
  };
  const editProductProblem = (payload, id) => {
    return useCustomFetch(
      `/v1/productProblem/${id}/`,
      payload.body,
      null,
      "PATCH"
    );
  };
  const deleteProductProblem = (id) => {
    return useCustomFetch(`/v1/productProblem/${id}/`, null, null, "DELETE");
  };
  const add_favorite = (payload) => {
    return useCustomFetch(
      `/v1/favorite-item/add/`,
      payload.body,
      null,
      "PATCH"
    );
  };
  const delete_favorite = (payload) => {
    return useCustomFetch(
      `/v1/favorite-item/remove/`,
      payload.body,
      null,
      "PATCH"
    );
  };
  const favorite_list = () => {
    return useCustomFetch(
      `/v1/favorite-item/`,
      null,
      "favoriteState",
      "GET",
      null,
      false,
      true
    );
  };
  const my_items = (query) => {
    return useCustomFetch(
      `/v1/product/${query}`,
      null,
      null,
      "GET",
      null,
      false,
      true
    );
  };
  const transaction = (page, limit) => {
    return useCustomFetch(`/v1/transaction/`, null, null, "GET", {
      page,
      limit,
    });
  };
  const promotion = (page, limit) => {
    return useCustomFetch(`/v1/promotion/`, null, "promotionState", "GET", {
      page,
      limit,
    });
  };
  const getSeo = (pathname) => {
    return useCustomFetch(
      `/v1/seo/`,
      null,
      null,
      "GET",
      { pathname },
      false,
      true
    );
  };
  const createCleaning = (payload) => {
    return useCustomFetch(
      `/v1/dry-cleaning/item/`,
      payload,
      null,
      "POST",
      null,
      false,
      true
    );
  };
  const getCleaning = (id) => {
    return useCustomFetch(`/v1/dry-cleaning/item/${id}`, null, null, "GET");
  };
  const getCollection = (query) => {
    return useCustomFetch(
      `/v1/dry-cleaning/date-slot/collection`,
      null,
      null,
      "GET",
      query
    );
  };
  const getDelivery = (query) => {
    return useCustomFetch(
      `/v1/dry-cleaning/date-slot/delivery`,
      null,
      null,
      "GET",
      query
    );
  };
  const editCleaning = (id, payload) => {
    return useCustomFetch(
      `/v1/dry-cleaning/item/${id}/`,
      payload,
      null,
      "PATCH"
    );
  };
  const getPostCodes = (query) => {
    return useCustomFetch(
      `/v1/external/location/`,
      null,
      null,
      "GET",
      query,
      false,
      true
    );
  };
  const getPostCode = (id) => {
    return useCustomFetch(
      `/v1/external/location/${id}`,
      null,
      null,
      "GET",
      null,
      false,
      true
    );
  };
  const cleaningServices = (query) => {
    return useCustomFetch(
      `/v1/dry-cleaning/service?limit=30`,
      null,
      null,
      "GET",
      query
    );
  };
  const itemServices = (data) => {
    return useCustomFetch(`/v1/dry-cleaning/item-service/bulk/`, data, null);
  };
  const tempUser = (data) => {
    return useCustomFetch(`/v1/auth/temp/`, data, null);
  };
  const crawlerItems = (query) => {
    return useCustomFetch(`/v1/crawler`, null, null, "GET", query);
  };
  const sendNote = (data) => {
    return useCustomFetch(`/v1/note/`, data);
  };
  return {
    getSeo,
    transaction,
    addProductProblem,
    getUser,
    productIdentify,
    addProductProblemBulk,
    productProblem,
    editProductProblem,
    deleteProductProblem,
    problems,
    createProduct,
    products,
    product,
    editProduct,
    productPlans,
    getFile,
    deleteFile,
    materials,
    colors,
    color,
    material,
    brands,
    brand,
    categories,
    category,
    file,
    add_favorite,
    delete_favorite,
    favorite_list,
    my_items,
    promotion,
    createCleaning,
    getCleaning,
    getCollection,
    getDelivery,
    editCleaning,
    getPostCodes,
    getPostCode,
    cleaningServices,
    itemServices,
    tempUser,
    crawlerItems,
    sendNote,
  };
};
export default useItem;
