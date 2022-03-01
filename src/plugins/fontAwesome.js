import Vue from "vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faUserSecret,
  faPlus,
  faSave,
  faClose,
  faRefresh,
  faPenAlt,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faPlus, faSave, faClose, faRefresh, faPenAlt);

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);
