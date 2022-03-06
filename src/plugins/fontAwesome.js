import Vue from "vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faUserSecret,
  faPlus,
  faPlusCircle,
  faMinusCircle,
  faSave,
  faClose,
  faRefresh,
  faPenAlt,
  faAlignLeft,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

import {
  faSquareCheck,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faPlus,
  faPlusCircle,
  faMinusCircle,
  faSave,
  faClose,
  faRefresh,
  faPenAlt,
  faSquareCheck,
  faCircleCheck,
  faAlignLeft,
  faSort
);

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);
