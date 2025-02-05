const useAccount = () => {
  const account_info = () => {
    return useCustomFetch(`/v1/user/me/`, null, 'account_info', null, 'GET');
  };
  const update_account_info = (payload) => {
    return useCustomFetch(`/v1/user/me/`, payload.body, null, "PATCH");
  };
  const addAddress = (payload) => {
    return useCustomFetch(`/v1/address/`, payload.body);
  };
  const addresses = (page, limit) => {
    return useCustomFetch(
      `/v1/address/`, 
      null, 
      'addresses', 
      "GET", 
      {
        page, 
        limit
      }
    );
  };
  const address = (id) => {
    return useCustomFetch(`
      /v1/address/${id}`, 
      null, 
      null, 
      "GET", 
    );
  };
  const editAddress = (payload, id) => {
    return useCustomFetch(`
      /v1/address/${id}`, 
      payload.body, 
      null, 
      "PATCH", 
    );
  };
  const deleteAddress = (id) => {
    return useCustomFetch(`
      /v1/address/${id}`, 
      null, 
      null, 
      "DELETE", 
    );
  };
  const withdrawList = () => {
    return useCustomFetch(
      `/v1/withdraw-request/`, 
      null, 
      null, 
      "GET", 
    );
  };

  return {
    account_info,
    update_account_info,
    addAddress,
    addresses,
    address,
    editAddress,
    deleteAddress,
    withdrawList
  };
};

export default useAccount;
