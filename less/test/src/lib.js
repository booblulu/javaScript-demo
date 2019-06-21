import Vue from "vue";
export function test() {
}

export class test2 {

}

import * as q from "./comp/*.vue"

console.log(q);

for(var i in q) {
    if(i == 'default') continue;
    Vue.component(i, q[i].default);
}