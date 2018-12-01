<template>
  <div class="collapsible-menu-container">
    <div class="sql-formatter">
      <SqlFormatter
        :sql="format"
        :current-keyword="currentKeyword"
        @on-set-keyword="setKeyword"
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
        'currentKeyword',
      ]),
    },
    methods: {
      ...mapActions({
        setKeyword: types.ACTION.GET_TABLE_FIELDS
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
