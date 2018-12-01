<template>
  <div class="collapsible-menu-container">
    <div class="sql-formatter">
      <SqlFormatter
        :sql="format"
        :current-field="currentField"
        @on-set-field="setField"
      />
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';
  import types                                from '../../vuex/types';
  import SqlFormatter                         from './SqlFormatter';


  export default {
    name      : "CollapsibleMenuContainer",
    computed  : {
      ...mapState([
        'format',
        'currentField',
      ]),
    },
    methods: {
      ...mapActions({
        setField: types.ACTION.SET_FIELD_INDEX
      }),
    },
    components: {
      SqlFormatter
    }

  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .collapsible-menu-container {
    width: 100%;
    height: 100%;

    .sql-formatter {
      padding: 15px;
    }
  }
</style>
