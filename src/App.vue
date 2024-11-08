<script lang="ts">
import Banner from "./components/Banner.vue";
import ConteudoPrincipal from "./components/MainContent.vue";
import Rodape from "./components/Footer.vue";

export default {
    components: { Banner, ConteudoPrincipal, Rodape },
};
</script>

<template>
    <Banner />
    <ConteudoPrincipal />
    <Rodape />
</template>

<style scoped></style>
