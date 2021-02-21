<template>
<div>
  <div class="bar">
    <div>
      <h1>Myanmar notation</h1>
    </div>
    <div>
      <a href="https://github.com/khensolomon/myanmar-notation/issues/new" class="link">issue</a>
      <a target="_blank" class="badge github" href="https://github.com/khensolomon/myanmar-notation/workflows/Node/badge.svg">
        <img src="https://github.com/khensolomon/myanmar-notation/workflows/Node/badge.svg" alt="Github">
      </a>
      <a href="https://travis-ci.com/khensolomon/myanmar-notation" class="badge travis">
        <img alt="Build Status" src="https://travis-ci.com/khensolomon/myanmar-notation.svg">
      </a>
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
            <span v-html="item.number"></span> <span v-html="item.digit"></span> .get(<span v-html="item.query"></span>)
          </p>
          <ul v-for="sense in item.notation" v-bind:key="sense">
            <li v-html="sense.sense"></li>
          </ul>
          <!-- <p v-html="item" class="json"></p> -->
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div>
      <a href="https://github.com/khensolomon/myanmar-notation/network">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/khensolomon/myanmar-notation?style=social">
      </a>

      <a href="https://github.com/khensolomon/myanmar-notation/stargazers">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/khensolomon/myanmar-notation?style=social">
      </a>
      <a href="https://github.com/khensolomon/myanmar-notation/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/khensolomon/myanmar-notation?style=social">
      </a>
    </div>
    <div>
      <a href="https://github.com/khensolomon/myanmar-notation/blob/master/LICENSE">
        <img alt="GitHub license" src="https://img.shields.io/github/license/khensolomon/myanmar-notation?style=social">
      </a>
    </div>
  </div>
</div>
</template>
<script src="./layout.js"></script>
