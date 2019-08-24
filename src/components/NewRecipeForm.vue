<template>
    <div id="form-wrapper">
        <form id="msform">
            <ul id="progressbar">
                <li id="general-details-progress" class="active form-section">General Details</li>
                <li id="timing-progress" class="form-section">Timing</li>
                <li id="ingredients-method-progress" class="form-section">Ingredients + Method</li>
            </ul>
            <fieldset id="general-details">
                <h2 class="fs-title">What's The Recipe?</h2>
                <input type="text" 
                        name="url" 
                        id="url" 
                        v-model="recipe.url" 
                        placeholder="RECIPE URL"/>
                <input type="text" 
                        name="imageUrl" 
                        id="imageUrl" 
                        v-model="recipe.imageUrl" 
                        placeholder="IMGAGE URL"/>
                <input type="text" 
                        name="title"
                        id="title"
                        v-model="recipe.title"
                        placeholder="TITLE" />
                <input type="textarea" 
                    name="descrption"
                    id="descrption"
                    v-model="recipe.description"
                    placeholder="In one sentence..." />
                <select id="meal" class="dropdown">
                    <option v-for="(meal, key) in meals" :key="key" 
                        :value="meal">{{ meal }}</option>
                </select>
                <select id="cuisine" class="dropdown">
                    <option v-for="(cuisine, key) in cuisines" :key="key" 
                        :value="cuisine">{{ cuisine }}</option>
                </select>
                <input type="button" name="next" class="next action-button" value="Next" v-on:click="nextFormStep" />
            </fieldset>
            <fieldset id="timing-details">
                <h2 class="fs-title">Timing</h2>
                <h3 class="fs-subtitle">Cooking is fun when you do it with your babe!</h3>
                <input type="number" 
                    name="totalTime"
                    id="totalTime"
                    v-model="recipe.totalTime" 
                    placeholder="TOTAL TIME TO COOK AND PREP IN MINUTES" />
                <input type="number" 
                    name="prepTime"
                    id="prepTime"
                    v-model="recipe.prepTime" 
                    placeholder="TIME TO PREP IN MINUTES" />
                <input type="number" 
                    name="cookTime"
                    id="cookTime"
                    v-model="recipe.cookTime" 
                    placeholder="TIME TO COOK IN MINUTES" />
                <input type="button" name="previous" class="previous action-button" value="Previous" v-on:click="previousFormStep" />
                <input type="button" name="next" class="next action-button" value="Next" v-on:click="nextFormStep" />
            </fieldset>
            <fieldset id="ingredient-method-details">
                <h2 class="fs-title">Ingredients + Method</h2>
                <h3 class="fs-subtitle">Read the list twice, go to the shops once</h3>
                <div class="container-center">
                    <div class="card mb-3" v-for="(ingredient, key) in recipe.ingredients" :key="key">
                        <div class="card-body">
                            <span class="float-right" style="cursor: pointer" @click="removeIngredient(index)">
                            X
                            </span>
                            <div class="ingredient-form form horizontal">
                                <input type="text"
                                    v-model="recipe.ingredients[key].item"
                                    class="mb-3 mr-5 ingredient" 
                                    style="width: 50%; display: inline;" 
                                    placeholder="INGREDIENT" />
                                <input type="number"
                                    class="mb-3 ingredient-quantity"
                                    style="width: 30%; display: inline;" 
                                    placeholder="QUANTITY" 
                                    v-model="recipe.ingredients[key].quantity" />
                            </div>
                        </div>
                    </div>
                    <div class="btn btn-primary mt-2 mb-5" @click="addIngredient">
                        ADD INGREDIENT
                    </div>
                </div>
                <input type="text" 
                        id="method"
                        v-model="recipe.method"
                        placeholder="HOW DO YOU MAKE IT?" />
                <input type="button" name="previous" class="previous action-button" value="Previous" v-on:click="previousFormStep" />
                <input method="post" name="submit" class="submit action-button" value="Submit" @submit="onSubmit" />
            </fieldset>
        </form>
    </div>
</template>

<script type="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import { store } from '@/store.ts';
import RecipeService from "@/services/RecipeService";

Vue.use(Vuex);

var left, opacity, scale;
var animating;

export default Vue.extend({
  name: "NewRecipeForm",
  data() {
    return {
      recipe: {
        url: "",
        imageUrl: "",
        title: "",
        description: "",
        meal: "",
        cuisine: "",
        totalTime: "",
        prepTime: "",
        cookTime: "",
        ingredients: [],
        method: ""
      },
      meals: this.$store.state.meals,
      cuisines: this.$store.state.cuisines,
      currentStep: $("#general-details")
    };
  },
  methods: {
    addIngredient: function() {
      this.recipe.ingredients.push({
        item: "",
        quantity: ""
      });
    },
    removeIngredient: function(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    async onSubmit(evt) {
      evt.preventDefault();
      await RecipeService.addRecipe({
        url: this.recipe.url,
        imageUrl: this.recipe.imageUrl,
        title: this.recipe.title,
        description: this.recipe.description,
        meal: this.recipe.meal,
        cuisine: this.recipe.cuisine,
        totalTime: this.recipe.totalTime,
        prepTime: this.recipe.prepTime,
        cookTime: this.recipe.cookTime,
        ingredients: this.recipe.ingredients,
        method: this.recipe.method
      });
      this.$router.push({ name: "recipes" });
    },
    getCurrentAndPreviousSteps: function () {
        switch($(".active.form-section").last().text()) {
            case "General Details":
                return { 
                    currentStep: $("#general-details"),
                    previousStep: null
                }
                break;
            case "Timing":
                return { 
                    currentStep: $("#timing-details"),
                    previousStep: $("#general-details")
                }
                break;
            case "Ingredients + Method":
                return { 
                    currentStep: $("#ingredient-method-details"),
                    previousStep: $("#timing-details")
                }
            default:
                return { 
                    currentStep: $("#timing-details"),
                    previousStep: $("#general-details")
                }
        }   
    },
    getCurrentAndNextSteps: function() {
        switch($(".active.form-section").last().text()) {
            case "General Details":
                return { 
                    currentStep: $("#general-details"),
                    nextStep: $("#timing-details")
                }
                break;
            case "Timing":
                return { 
                    currentStep: $("#timing-details"),
                    nextStep: $("#ingredient-method-details")
                }
                break;
            case "Ingredients + Method":
                return { 
                    currentStep: $("#ingredient-method-details"),
                    nextStep: null
                }
            default:
                return { 
                    currentStep: $("#timing-details"),
                    nextStep: $("#ingredient-method-details")
                }
        }   
    },
    nextFormStep: function() {
        var currentAndnextStep = this.getCurrentAndNextSteps();
        var currentStep = currentAndnextStep.currentStep;
        var nextStep = currentAndnextStep.nextStep;
	
        $("#progressbar li")
            .eq($("fieldset")
            .index(nextStep))
            .addClass("active");

        currentStep.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.1;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                currentStep.css({'transform': 'scale('+scale+')'});
                nextStep.css({'left': left, 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                currentStep.hide();
                nextStep.show();
                animating = false;
            }, 
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    },
    previousFormStep: function() {
        if(animating) return false;
        animating = true;
        
        var currentAndPreviousSteps = this.getCurrentAndPreviousSteps();
        var currentStep = currentAndPreviousSteps.currentStep;
        var previousStep = currentAndPreviousSteps.previousStep;

        $("#progressbar li")
            .eq($("fieldset")
            .index(currentStep))
            .removeClass("active");

        previousStep.show(); 
        currentStep.animate({opacity: 0}, {
            step: function(now, mx) {
                scale = 0.9 + (1 - now) * 0.1;
                left = ((1-now) * 20)+"%";
                opacity = 1 - now;
                currentStep.css({'left': left});
                previousStep.css({'transform': 'scale('+scale+')', 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                currentStep.hide();
                animating = false;
            }, 
            easing: 'easeInOutBack'
        });
    },
    submit: function() {
        /*	do something here */
        return false;
    }
  },
  mounted() {
    let jqueryScript = document.createElement('script');
    jqueryScript.setAttribute('src', 'http://thecodeplayer.com/uploads/js/jquery-1.9.1.min.js');
    jqueryScript.setAttribute('type', 'text/javascript');
    document.head.appendChild(jqueryScript);

    let jqueryEasingScript = document.createElement('script');
    jqueryEasingScript.setAttribute('src', 'http://thecodeplayer.com/uploads/js/jquery.easing.min.js');
    jqueryEasingScript.setAttribute('type', 'text/javascript');
    document.head.appendChild(jqueryEasingScript);
  }
});
</script>
<style type="text/scss" scoped>
* {margin: 0; padding: 0;}
html{background-image:url(http://hdwallpapercorner.com/gallery/5038-flight-at-sunset-800x600.jpg);background-position:center;background-size:cover;height:100%;width:100%;}
body {
	font-family: montserrat, arial, verdana;margin:0;
}

.dropdown {
    width: 260px;
    height: 31.08px;
    text-align: center;
    position: relative;
    margin-bottom: 10px;
}

#msform {
	width: 400px;
	margin: 50px auto;
	text-align: center;
	position: relative;
}

#msform fieldset {
	background: rgba(0,0,0,0.7);
	border: 0 none;
	border-radius: 3px;
	box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
	padding: 20px 30px;
	box-sizing: border-box;
	width: 80%;
	margin: 0 10%;
	position: absolute;
}

#msform fieldset:not(:first-of-type) {
	display: none;
}

#msform input, #msform textarea {
	padding: 5px;
	border: 1px solid #333;
	border-radius: 3px;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
	font-family: montserrat;
	color: #2C3E50;
	font-size: 13px;
}

#msform .action-button {
	width: 100px;
	background: #27AE60;
	font-weight: bold;
	color: #fff;
	border: 0 none;
	border-radius: 1px;
	cursor: pointer;
	padding: 10px 5px;
	margin: 10px 5px;
}

#msform .action-button:hover, #msform .action-button:focus {
	box-shadow: 0 0 0 2px white, 0 0 0 3px #27AE60;
}

.fs-title {
	font-size: 15px;
	text-transform: uppercase;
	color: #fff;
	margin-bottom: 10px;
}

.fs-subtitle {
	font-weight: normal;
	font-size: 13px;
	color: rgba(255,255,255,0.7);
	margin-bottom: 20px;
}

#progressbar {
	margin-bottom: 30px;
	overflow: hidden;
	/*CSS counters to number the steps*/
	counter-reset: step;
}

#progressbar li {
	list-style-type: none;
	color: #333;
	text-transform: uppercase;
	font-size: 9px;
	width: 33.33%;
	float: left;
	position: relative;
}

#progressbar li:before {
	content: counter(step);
	counter-increment: step;
	width: 20px;
	line-height: 20px;
	display: block;
	font-size: 10px;
	color: #333;
	background: #ccc;
	border-radius: 3px;
	margin: 0 auto 5px auto;
}

#progressbar li:after {
	content: '';
	width: 100%;
	height: 2px;
	background: #ccc;
	position: absolute;
	left: -50%;
	top: 9px;
	z-index: -1;
}

#progressbar li:first-child:after {
	content: none; 
}

#progressbar li.active:before,  #progressbar li.active:after{
	background: #27AE60;
	color: #fff;
}

.left,.right{position:fixed;display:block;height:100vh;}
.left{width:calc(60vw - 4%);max-width:calc(92% - 300px);padding:2%;overflow:auto}
.right{background:rgba(0,0,0,0.7);right:0;padding:2%;width:calc(40vw - 4%);min-width:300px;}
.graph{border:0px solid #fff;padding:2px 3px 2px 3px;border-radius:8px}
.graph div{background: #FFB300;width:10%;font-size:10px;text-align:right;padding:3px 10px 3px 10px;border-radius:6px}
</style>
