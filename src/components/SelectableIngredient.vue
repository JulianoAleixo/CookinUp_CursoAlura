<script lang="ts">
import Tag from "./Tag.vue";

export default {
    components: { Tag },
    props: {
        ingredient: { type: String, required: true },
    },
    data() {
        return {
            selected: false,
        };
    },
    methods: {
        handleClick() {
            this.selected = !this.selected;

            if (this.selected) {
                this.$emit('addIngredient', this.ingredient);
            } else {
                this.$emit('removeIngredient', this.ingredient);
            }
        }
    }, 
    emits: ['addIngredient', 'removeIngredient']
};
</script>

<template>
    <button class="ingrediente" @click="handleClick()" :aria-pressed="selected">
        <Tag :text="ingredient" :active="selected" />
    </button>
</template>

<style scoped>
.ingrediente {
    cursor: pointer;
}
</style>
