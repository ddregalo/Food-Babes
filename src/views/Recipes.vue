<template>
    <div class="recipes">
        <div class="title">
            <h1>recipes</h1>
        </div>
        <div v-for="recipe in recipes" :key="recipe.id">
            <p>
                <span><b>{{ recipe.title }}</b></span><br />
                <span>{{ recipe.description }}</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    export default Vue.extend({
        props: [],
        data() {
            return {
                // enthusiasm: this.initialEnthusiasm,
            }
        },
        methods: {
            // increment() { this.enthusiasm++; },
            // decrement() {
            //     if (this.enthusiasm > 1) {
            //         this.enthusiasm--;
            //     }
            // },
        },
        computed: {
            // exclamationMarks(): string {
            //     return Array(this.enthusiasm + 1).join('!');
            // }
        }
    });
</script>

<style>
h1 {
    margin-top: 0;
    font-size: 100px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #42b983;
}
</style>