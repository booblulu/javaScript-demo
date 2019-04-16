import Vue from "vue";
import "./css/my-dialog.css";
import "bootstrap/dist/css/bootstrap.css";

export default Vue.component("my-dialog", {
    data(){
        return {}
    },
    template: `
        <div class="panel panel-default my-dialog">
            <div class="panel-heading">
                <slot name="title"/>
            </div>
            <div class="panel-body">
                <slot/>
            </div>
        </div>
    `
    // template: `
    //     <div>
    //         <h2><slot name="title"/></h2>
    //         <slot/>result
    //     </div>
    // `
})
