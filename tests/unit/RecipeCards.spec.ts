import { shallowMount, mount } from '@vue/test-utils';
// import RecipeCards from '@/components/RecipeCards.vue';
const RecipeCards = require('../../src/components/RecipeCards.vue');

describe('Recipes Cards Component', () => {

  var wrapper: any

  beforeEach(() =>{
    wrapper = shallowMount(RecipeCards);
  });

  it('renders the correct markup', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has a component object', () => {
    expect(typeof RecipeCards).toBe('object');
  });
});