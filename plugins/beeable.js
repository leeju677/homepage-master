import Vue from 'vue'
import DatePicker from "vue2-datepicker";
import Switches from "vue-switches";
import Multiselect from "vue-multiselect";

import SbCopyright from '@/components/widgets/SbCopyright';
import SbCollapse from '@/components/widgets/SbCollapse/SbCollapse';
import SbCollapseButton from '@/components/widgets/SbCollapse/SbCollapseButton';
import SbCollapseContents from '@/components/widgets/SbCollapse/SbCollapseContents';
import SbConformPop from '@/components/widgets/SbConformPop';
import SbLabel from '@/components/widgets/SbLabel';
import SbAddress from '@/components/widgets/SbAddress'
import SbAvatar from '@/components/widgets/SbAvatar'

import SbApi from "@/mixins/apiMixin";
import SbAlert from '@/mixins/alertMixin';

Vue.component('SbCopyright', SbCopyright);
Vue.component('DatePicker', DatePicker);
Vue.component('Switches', Switches);
Vue.component('Multiselect', Multiselect);

Vue.component('SbCollapse', SbCollapse);
Vue.component('SbCollapseButton', SbCollapseButton);
Vue.component('SbCollapseContents', SbCollapseContents);
Vue.component('SbConformPop', SbConformPop);
Vue.component('SbLabel', SbLabel);
Vue.component('SbAddress', SbAddress);
Vue.component('SbAvatar', SbAvatar);

Vue.use(SbApi);
Vue.use(SbAlert);