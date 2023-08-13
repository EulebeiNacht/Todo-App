<script setup>
import { ref, watch, computed } from 'vue';
import { uid } from 'uid';
import { Icon } from '@iconify/vue';
import TodoCreator from "../components/TodoCreator.vue";
import TodoItem from '../components/TodoItem.vue';

const todoList = ref([]);

const fetchTodoList = () => {
  const saveTodoList = JSON.parse(localStorage.getItem("todoList"));
  if (saveTodoList) {
    todoList.value = saveTodoList;
  }
};
fetchTodoList();

const setTodoList = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};
watch(todoList, () => {
  setTodoList();
}, {
  deep:true,
})

const todoCompleted = computed(() => {
  return todoList.value.every((item) => item.isCompleted);
})

const handleCreateTodo = (todo) => {
    todoList.value.push({
        id: uid(),
        todo,
        isCompleted: false,
        isEditing: false,
    })
};
const toggleTodoComplete = (todoPos) => {
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted;
};
const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
};
const updateTodo = (todoVal, todoPos) => {
  todoList.value[todoPos].todo = todoVal;
};
const deleteTodo = (todoId) => {
  todoList.value = todoList.value.filter((item) => item.id != todoId);
};
</script>

<template>
  <main>
    <h1>创建任务</h1>
    <TodoCreator @create-todo="handleCreateTodo" />
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem v-for="(todoItem, index) in todoList" 
      :todoProp="todoItem" 
      :indexProp="index" 
      @toggle-complete="toggleTodoComplete" 
      @edit-todo="toggleEditTodo" 
      @update-todo="updateTodo" 
      @delete-todo="deleteTodo" />
    </ul>
    <p class="todos-msg" v-else>
      <Icon icon="emojione:sad-but-relieved-face" width="22" />
      <span>还没有任务，快创建一个吧！</span>
    </p>
    <p v-if="todoCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="emojione:party-popper" width="22" />
      <span>你已经完成了所有的任务！</span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>