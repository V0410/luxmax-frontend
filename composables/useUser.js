const useUser = () => {
  const checkEmail = async(payload) => {
    return useCustomFetch(`/v1/auth/check/`, payload.body);
  };

  const ifEmailExists = async(payload) => {
    return useCustomFetch(`/v1/auth/exists/`, payload.body);
  };

  const ifPhoneExists = async(payload) => {
    return useCustomFetch(`/v1/auth/exists-phone/`, payload.body);
  };

  const verifyPhone = async(payload) => {
    return useCustomFetch(`/v1/auth/verify-phone/`, payload.body);
  };

  const sendOtpForLogin = async(payload) => {
    return useCustomFetch(`/v1/auth/send-otp-for-login/`, payload.body);
  };

  const loginWithOtp = async(payload) => {
    return useCustomFetch(`/v1/auth/login-with-otp/`, payload.body);
  };

  // sendOtpForLogin,
  // loginWithOtp,

  const checkOtp = async(payload) => {
    return useCustomFetch(
      `/v1/auth/check-otp/`,
      payload.body,
      null,
      "POST",
      null,
      false,
      true
    );
  }

  const login = async (payload) => {
    return useCustomFetch(
      `/v1/auth/login/`,
      payload.body,
      null,
      "POST",
      null,
      false,
      true
    );
  };

  const register = async (payload) => {
    return useCustomFetch(
      `/v1/auth/register/`,
      payload.body,
      null,
      "POST",
      null,
      false,
      true
    );
  };
  const callBack = async (token) => {
    return useCustomFetch(
      `/v1/auth/callback/${token}/`,
      null,
      null,
      "GET",
      null,
      false,
      true
    );
  };
  const refreshToken = (payload) => {
    return useCustomFetch(
      `/v1/auth/refresh-token/`,
      payload.body,
      null,
      "POST",
      null,
      false,
      true
    );
  };

  const logout = async () => {
    useCookie("refreshToken").value = null;
    useCookie("token").value = null;
    return useCustomFetch(`/v1/auth/logout/`, null, null, "DELETE");
  };

  return {
    callBack,
    login,
    register,
    checkOtp,
    ifEmailExists,
    ifPhoneExists,
    verifyPhone,
    sendOtpForLogin,
    loginWithOtp,
    logout,
    checkEmail,
    refreshToken,
  };
};

export default useUser;
