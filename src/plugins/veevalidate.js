import Vue from "vue";
import { ValidationObserver, extend, localize } from 'vee-validate';
import az from 'vee-validate/dist/locale/az.json';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("az", az);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
