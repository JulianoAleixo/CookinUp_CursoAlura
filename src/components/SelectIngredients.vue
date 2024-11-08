<script lang="ts">
import { getCategories } from "@/http/index";
import type ICategory from "@/interfaces/ICategory";
import CardCategory from "./CardCategory.vue";
import ButtonMain from "./ButtonMain.vue";

export default {
    name: "SelectIngredients",
    data() {
        return {
            categorias: [] as ICategory[],
        };
    },
    async created() {
        this.categorias = await getCategories();
    },
    components: { CardCategory, ButtonMain },
    emits: ["addIngredient", "removeIngredient", "searchRecipes"],
};
</script>

<template>
    <section class="selecionar-ingredientes">
        <h1 class="cabecalho titulo-ingredientes">Ingredientes</h1>

        <p class="paragrafo-lg instrucoes">
            Selecione abaixo os ingredientes que você quer usar nesta receita:
        </p>

        <ul class="categorias">
            <li v-for="category in categorias" :key="category.nome">
                <CardCategory
                    :category="category"
                    @add-ingredient="
                        $emit('addIngredient', $event)
                    "
                    @remove-ingredient="$emit('removeIngredient', $event)"
                />
            </li>
        </ul>

        <p class="paragrafo dica">
            *Atenção: Consideramos que você tem em casa sal, pimenta e água.
        </p>

        <ButtonMain text="Buscar Receitas" @click="$emit('searchRecipes')" />
    </section>
</template>

<style scoped>
.selecionar-ingredientes {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.titulo-ingredientes {
    color: var(--verde-medio, #3d6d4a);
    display: block;
    margin-bottom: 1.5rem;
}

.instrucoes {
    margin-bottom: 2rem;
}

.categorias {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.dica {
    align-self: flex-start;
    margin-bottom: 3.5rem;
}

@media only screen and (max-width: 767px) {
    .dica {
        margin-bottom: 2.5rem;
    }
}
</style>
