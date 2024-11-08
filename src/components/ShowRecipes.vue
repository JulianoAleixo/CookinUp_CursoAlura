<script lang="ts">
import type { PropType } from "vue";
import type IRecipe from "@/interfaces/IRecipe";
import { getRecipes } from "@/http";
import { matchLists } from "@/operations/lists";
import CardRecipe from "./CardRecipe.vue";
import ButtonMain from "./ButtonMain.vue";

export default {
    props: {
        ingredients: { type: Array as PropType<string[]>, required: true },
    },
    data() {
        return {
            foundRecipes: [] as IRecipe[],
        };
    },
    async created() {
        const recipes = await getRecipes();

        this.foundRecipes = recipes.filter((recipe) => {
            const canDoRecipe = matchLists(
                recipe.ingredientes,
                this.ingredients
            );
            return canDoRecipe;
        });
    },
    components: { ButtonMain, CardRecipe },
    emits: ["editRecipes"],
};
</script>

<template>
    <section class="mostrar-receitas">
        <h1 class="titulo-receitas">Receitas</h1>

        <p class="paragrafo-lg resultados-encontrados">
            Resultados encontrados: {{ foundRecipes.length }}
        </p>

        <div v-if="foundRecipes.length" class="receitas-wrapper">
            <p class="paragrafo-lg informacoes">
                Veja as opções que encontramos com os ingredientes que você tem
                por aí!
            </p>

            <ul class="receitas">
                <li v-for="recipe of foundRecipes" :key="recipe.nome">
                    <CardRecipe :recipe="recipe" />
                </li>
            </ul>
        </div>

        <div v-else class="receitas-nao-encontradas">
            <p class="paragrafo-lg receitas-nao-encontradas__info">
                Ops, não encontramos resultados para sua combinação. Vamos
                tentar de novo?
            </p>

            <img
                src="../assets/images/sem-receitas.png"
                alt="Desenho de um ovo quebrado. A gema tem um rosto com uma expressão triste."
            />
        </div>

        <ButtonMain text="Editar lista" @click="$emit('editRecipes')" />
    </section>
</template>

<style scoped>
.mostrar-receitas {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.titulo-receitas {
    color: var(--verde-medio, #3d6d4a);
    margin-bottom: 1.5rem;
}

.resultados-encontrados {
    color: var(--verde-medio, #3d6d4a);
    margin-bottom: 0.5rem;
}

.receitas-wrapper {
    margin-bottom: 3.5rem;
}

.informacoes {
    margin-bottom: 2rem;
}

.receitas {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.receitas-nao-encontradas {
    margin-bottom: 2rem;
}

.receitas-nao-encontradas__info {
    margin-bottom: 0.5rem;
}

@media only screen and (max-width: 767px) {
    .receitas-wrapper {
        margin-bottom: 2rem;
    }
}
</style>
