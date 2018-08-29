<template>
  <v-flex xs4>
    <router-link v-for="(question, key) in questions" :key="key" :to="route + question._id">
      <v-list two-line >
        <template>
          <v-list-tile avatar ripple>
            <v-list-tile-action>
              <v-list-tile-action-text><i class="fas fa-paw fa-3x"></i></v-list-tile-action-text>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ question.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ question.content }}</v-list-tile-sub-title>
            </v-list-tile-content>        
          </v-list-tile>
        </template>
      </v-list>
    </router-link>
  </v-flex>
</template>

<script>
export default {
  props: ['route', 'questions'],

}
</script>

<style scoped>
.v-list{
  border-bottom: 1px solid lightgrey !important;
  border-right: 1px solid lightgrey !important
}
</style>