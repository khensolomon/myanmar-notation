<template>
<div>
  <div class="bar">
    <div>
      <h1>Myanmar notation</h1>
    </div>
    <div>
      <a href="https://github.com/khensolomon/myanmar-notation/issues/new" class="link">issue</a>
      <a href="https://travis-ci.com/khensolomon/myanmar-notation" rel="nofollow">
        <img alt="Build Status" src="https://travis-ci.com/khensolomon/myanmar-notation.svg">
      </a>
      <!-- <a href="/?q=2343"  class="link">share</a> -->
    </div>
  </div>
  <!-- <router-view class="wrapper"></router-view> -->
  <div class="wrapper">
    <div class="container">
      <!-- <form action="#">
        <textarea name="text" id="text"></textarea>
      </form> -->
      <div>
        <div contenteditable="true" @input="handleInput" ref="handleId">
          <!-- <div v-for="item in contentQuery" :key="item" v-html="item"></div> -->
        </div>
      </div>
      <!-- <div contenteditable="false" v-html="contentValue">result</div> -->
      <div class="result">
        <div v-for="item in notation" v-bind:key="item">
          <p>
            <span v-html="item.number"></span> .get(<span v-html="item.query"></span>)
          </p>
          <ul v-for="sense in item.notation" v-bind:key="sense">
            <li v-html="sense.sense"></li>
          </ul>
          <!-- <p v-html="item" class="json"></p> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script src="./layout.js"></script>
