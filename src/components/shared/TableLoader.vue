<template>
  <table class="w-full whitespace-no-wrap">
    <thead>
      <tr
        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
      >
        <th class="px-4 py-3" v-for="i in +size" :key="i">
          <SkeletonLoader />
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      <tr
        class="text-gray-700 dark:text-gray-400"
        v-for="i in +rowCount"
        :key="i"
      >
        <td class="px-4 py-3 text-sm font-semibold" v-for="c in +size" :key="c">
          <SkeletonLoader />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import SkeletonLoader from "./SkeletonLoader.vue";

export default {
  props: {
    size: {
      type: Number,
      required: true,
    },
    rowCount: {
      type: Number,
      required: true,
    },
  },
  components: { SkeletonLoader },
};
</script>
