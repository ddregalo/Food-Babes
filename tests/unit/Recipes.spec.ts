import { shallowMount } from '@vue/test-utils';
const Recipes = require('../../src/views/Recipes');

describe('Recipes View', () => {
  const wrapper = shallowMount(Recipes);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});