import { shallowMount, mount } from '@vue/test-utils';
const NewRecipe = require('../../src/components/NewRecipe.vue');

describe('NewRecipe Component', () => {

    var wrapper: any
  
    beforeEach(() =>{
      wrapper = shallowMount(NewRecipe);
    });
  
    it('renders the correct markup', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  
    it('has a component object', () => {
      expect(typeof NewRecipe).toBe('object');
    });
  });