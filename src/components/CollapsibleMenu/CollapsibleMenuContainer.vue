<template>
  <div class="collapsible-menu-container">
    <pre class="sql-formatter">
      {{format}}
    </pre>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';
  import types                                from '../../vuex/types';


  export default {
    name    : "CollapsibleMenuContainer",
    computed: {
      ...mapState([
        'format'
      ]),
    }

  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .collapsible-menu-container {
    width: 100%;
    height: 100%;

    .sql-formatter {
      color: #fff;
      padding: 15px;
    }
  }
</style>
