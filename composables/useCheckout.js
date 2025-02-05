const useCheckout = () => {
  const cart = async () => {
    return useCustomFetch(
      `/v1/cart/`,
      null,
      "cartList",
      "GET",
      null,
      false,
      true,
    );
  };
  const addCart = async (payload) => {
    return useCustomFetch(
      `/v1/cart/add/`,
      payload.body,
      null,
      "PATCH",
    );
  };
  const deleteCart = async (payload) => {
    return useCustomFetch(
      `/v1/cart/remove/`,
      payload.body,
      null,
      "PATCH",
    );
  };  
  const cards = async () => {
    return useCustomFetch( `/v1/credit-card/`, null, "cards", "GET");
  }
  const addCard = async (payload) => {
    return useCustomFetch(`/v1/credit-card/`, payload.body);
  };
  const card = async (id) => {
    return useCustomFetch(`/v1/credit-card/${id}`, null, null, "GET");
  }
  const editCard = async (id) => {
    return useCustomFetch(`/v1/credit-card/${id}`, null, null, "PATCH");
  }
  const deleteCard = async (id) => {
    return useCustomFetch(`/v1/credit-card/${id}`, null, null, "DELETE");
  };
  const createOrder = async (payload) => {
    return useCustomFetch(
      `/v1/order/`,
      payload.body,
    );
  };
  const orders = async (query) => {
    return useCustomFetch(
      `/v1/order/`,
      null,
      null,
      "GET",
      query,
    );
  };
  const order = async (id) => {
    return useCustomFetch(
      `/v1/order/${id}/`,
      null,
      null,
      "GET",
    );
  };
  const editOrder = async (id, data) => {
    return useCustomFetch(`/v1/order/${id}`, data, null, "PATCH");
  }
  const checkout = async (id) => {
    return useCustomFetch(
      `/v1/order/${id}/checkout`,
    );
  }
  const retrieve = async (id) => {
    return useCustomFetch(
      `/v1/order/${id}/retrieve`,
      null,
      null,
      "GET",
    );
  }
  const withdraw = async (body) => {
    return useCustomFetch(
      `/v1/withdraw-request`,
      body
    );
  }

  const markPaymentAsSuccessfull = (payload) => {
    return useCustomFetch(
      `/v1/order/mark-payment-as-successful/`,
      payload,
      null,
      "POST",
      null,
      false,
      true
    );
  };

  const getCoupons = () => {
    const query = {
      page: 1,
      limit: 5
    }
    return useCustomFetch(
      "/v1/coupon",
      null,
      null,
      "get",
      query
    );
  }

  const getCouponDetail = (code) => {
    return useCustomFetch(
      `/v1/coupon/${code}`,
      null,
      null,
      "get"
    );
  }

  return {
    cart,
    addCart,
    deleteCart,
    addCard,
    cards,
    card,
    editCard,
    deleteCard,
    createOrder,
    orders,
    order,
    checkout,
    retrieve,
    withdraw,
    editOrder,
    markPaymentAsSuccessfull,
    getCoupons,
    getCouponDetail
  };
};

export default useCheckout;
