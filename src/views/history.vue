<template>
  <mu-container>
  <mu-paper :z-depth="1">
    <mu-data-table :loading="true" :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list.slice(0, 6)">
      <template slot-scope="scope">
        <td>{{scope.row.name}}</td>
        <td class="is-right">{{scope.row.calories}}</td>
        <td class="is-right">{{scope.row.fat}}</td>
        <td class="is-right">{{scope.row.carbs}}</td>
        <td class="is-right">{{scope.row.protein}}</td>
        <td class="is-right">{{scope.row.iron}}%</td>
      </template>
    </mu-data-table>
  </mu-paper>
</mu-container>
</template>
<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>