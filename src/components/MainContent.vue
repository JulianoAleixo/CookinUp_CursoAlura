<script lang="ts">
import SelectIngredients from "./SelectIngredients.vue";
import ShowRecipes from "./ShowRecipes.vue";
import YourList from "./YourList.vue";

type Page = "SelectIngredients" | "ShowRecipes";

export default {
    data() {
        return {
            ingredients: [] as string[],
            content: "SelectIngredients" as Page,
        };
    },
    components: { YourList, SelectIngredients, ShowRecipes },
    methods: {
        addIngredient(ingredient: string) {
            this.ingredients.push(ingredient);
        },
        removeIngredient(ingredient: string) {
            this.ingredients = this.ingredients.filter(
                (item) => ingredient !== item
            );
        },
        navigate(page: Page) {
            this.content = page;
        },
    },
};
</script>

<template>
    <main class="conteudo-principal">
        <YourList :ingredients="ingredients" />

        <KeepAlive include="SelectIngredients">
            <SelectIngredients
                v-if="content === 'SelectIngredients'"
                @add-ingredient="addIngredient($event)"
                @remove-ingredient="removeIngredient($event)"
                @search-recipes="navigate('ShowRecipes')"
            />

            <ShowRecipes
                v-else-if="content === 'ShowRecipes'"
                :ingredients="ingredients"
                @edit-recipes="navigate('SelectIngredients')"
            />
        </KeepAlive>
    </main>
</template>

<style scoped>
.conteudo-principal {
    padding: 6.5rem 7.5rem;
    border-radius: 3.75rem 3.75rem 0rem 0rem;
    background: var(--creme, #bababa);
    color: var(--cinza, #444);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
}

@media only screen and (max-width: 1300px) {
    .conteudo-principal {
        padding: 5rem 3.75rem;
        gap: 3.5rem;
    }
}

@media only screen and (max-width: 767px) {
    .conteudo-principal {
        padding: 4rem 1.5rem;
        gap: 4rem;
    }
}
</style>
