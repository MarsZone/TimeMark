<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

    <ons-list-title>Add a new task</ons-list-title>
    <ons-list>
      <ons-list-item modifier="nodivider">
        <div class="center">
          <ons-input id="title-input" type="text" placeholder="I want to..." float></ons-input>
        </div>
      </ons-list-item>
      <ons-list-item modifier="nodivider">
        <div class="center">
          <ons-input id="category-input" type="text" placeholder="Category" float></ons-input>
        </div>
      </ons-list-item>
      <ons-list-item modifier="nodivider">
        <div class="center">
          <ons-input id="description-input" type="text" placeholder="Description" float></ons-input>
        </div>
      </ons-list-item>
    </ons-list>

    <ons-list-title>Other options</ons-list-title>
    <ons-list>
      <ons-list-item modifier="nodivider">
        <label class="center" for="inner-highlight-input">
          TaskRepeat?
        </label>
        <div class="right">
          <ons-switch id="highlight-input" input-id="inner-highlight-input"></ons-switch>
        </div>
      </ons-list-item>

    </ons-list>

    <ons-if platform="ios other">
      <ons-button class="button button--outline my-button" >Add New Task</ons-button>
    </ons-if>
  </v-ons-page>
</template>

<script>
    export default {}
</script>

<style>
  .my-button{
    width: 100%;
    margin: 10px auto;
    text-align: center;
  }
</style>
