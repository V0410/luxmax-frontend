const useToast = () => {
  const create = (payload) => {
    if (typeof window !== "undefined") {
      if (!payload.id || !payload.time || !payload.type) {
        return console.error(
          "please make sure your payload for creating toast is correct!"
        );
      }
      const toastState = useState("toasts");
      if (!toastState.value || !Array.isArray(toastState.value)) {
        toastState.value = [];
      }
      if (toastState.value.length >= 3) {
        toastState.value.shift();
      }
      toastState.value.push(payload);
      setTimeout(() => {
        toastState.value.shift();
      }, +payload.time * 1000);
    }
  };
  const remove = (payload) => {
    if (typeof window !== "undefined") {
      if (!payload.id) {
        return console.error(
          "please make sure your payload for remove toast is correct!"
        );
      }
      const toastState = useState("toasts");
      if (toastState.value) {
        const foundIndex = toastState.findIndex((el) => el.id === payload.id);
        toastState.slice(foundIndex, foundIndex + 1);
      } else {
        console.error("No toast for removing!");
      }
    }
  };
  return {
    create,
    remove,
  };
};

export default useToast;
