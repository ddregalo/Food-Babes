import { shallowMount } from '@vue/test-utils';
const About = require('../../src/views/About');

describe('About View', () => {
  const wrapper = shallowMount(About);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<h1>This is an about page</h1>');
  });
});