<template>
  <div>
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Index", // Matches the import in the router
  components: {
    ProductList,
  },
};
</script>
