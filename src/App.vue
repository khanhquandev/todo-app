<script setup>
import { ref } from 'vue'
const newTodo = ref('')
const works = ref([])
const addWork = () => {
  if (newTodo.value === '') {
    return
  } else {
    works.value.push({
      id: works.value.length + 1,
      text: newTodo.value,
    })
    newTodo.value = ''
  }
}
const clearWork = () => {
  works.value = []
}
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="title">
        <h1>Todo App</h1>
      </div>
      <div class="top">
        <input type="text" v-model="newTodo" @keyup.enter="addWork" />
        <button class="btn" @click="addWork">Add Work</button>
      </div>
      <div class="list-todo">
        <ol>
          <li v-for="item in works" :key="item.id">{{ item.text }}</li>
        </ol>
      </div>
      <div class="bottom">
        <button class="btn btn-clear" @click="clearWork">Clear Work</button>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: monospace;
}
.title {
  margin-top: 25px;
  font-size: 15px;
  color: #4a3780;
  margin-left: 37%;
}
.content {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.5);
}
.top {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
input {
  padding: 5px;
  border: none;
  outline: none;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
}
.btn {
  display: inline-block;
  padding: 8px 20px;
  background-color: #4a3780;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-family: monospace;
  &:hover {
    background-color: #9395d3;
  }
}
.list-todo {
  margin-top: 30px;
  color: #8689da;
  height: 300px;
  font-weight: bold;
  margin-left: 100px;
}
li {
  font-size: 25px;
  font-family: monospace;
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
