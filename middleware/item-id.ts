export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query.item_id || to.params.id) {
  } else {
    return navigateTo({ name: "items" });
  }
});
