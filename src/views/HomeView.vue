<template>
  <main class="home">
    <div class="todo">
      <div class="title has-text-centered">
        <h1>Todo List</h1>
      </div>
      <form @submit.prevent="addTodo">
        <div class="field has-addons" style="padding: 2rem 19rem">
          <div class="control">
            <input
              class="input todo-field"
              type="text"
              placeholder="Add a todo"
              v-model="newTodoContent"
            />
          </div>
          <div class="control">
            <button
              class="button is-info form-btn"
              type="submit"
              :disabled="!newTodoContent"
              id="addbtn"
              ref="addbtn"
              v-if="addbtn"
            >
  
              Add
            </button>
       
          </div>
          <div class="control">
            <button
              class="button is-info form-btn"
              type="button"
              :disabled="!newTodoContent"
              id="EditBtn"
              v-if="EditBtn"
              @click="editTodos"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
      <div
        class="card"
        v-for="todo in todos"
        :key="todo.id"
        :class="{
          'has-background-success-light , has-text-success': todo.done,
        }"
      >
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div class="column">
                {{ todo.content }}
              </div>
              <div class="column is-10 has-text-right d-flex">
                <button
                  class="button"
                  :class="todo.done ? 'is-success' : 'is-light'"
                  @click="toggleTodo(todo.id)"
                >
                  &check;
                </button>
                <button class="button is-danger ml-2" @click="delTodo(todo.id)">
                  &cross;
                </button>
                <button
                  class="button is-warning ml-2 edit"
                  @click="intiateEdit(todo.id)"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const todoCollection = collection(db, "todos");
const todosQuery = query(todoCollection, orderBy("date", "desc"));
const addbtn = ref(true);
const EditBtn = ref(false);
let activeTodoId = "";
const todos = ref([]);
onMounted(() => {
  onSnapshot(todosQuery, (querySnapshot) => {
    const fbTodos = [];

    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        date: doc.data().date,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

const newTodoContent = ref("");
const addTodo = () => {
  console.log("Add new");
  addDoc(todoCollection, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });
  toast.success("Todo Added"),
  {
  autoClose: 1000,
 
  };
  newTodoContent.value = "";
};
const delTodo = (id) => {
  deleteDoc(doc(todoCollection, id));
  toast.warning("Todo Deleted"),
  {
  autoClose: 1000,
 
  };
};
const toggleTodo = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todoCollection, id), {
    done: !todos.value[index].done,
  });
  console.log(index, id, "idindex");

  toast.info("Todo Status Changed"),
  {
  autoClose: 1000,
 
  };
};
const intiateEdit = (id) => {
  activeTodoId = id;
  const index = todos.value.findIndex((todo) => todo.id === id);
  newTodoContent.value = todos.value[index].content;
  EditBtn.value = true;
  addbtn.value = false;
  console.log(id, "id from first");

  
};
const editTodos = () => {
  console.log("id", activeTodoId);

  if (EditBtn.value === true) {
    updateDoc(doc(todoCollection, activeTodoId), {
      content: newTodoContent.value,
    });
    console.log("updated ");
  } 

    EditBtn.value = false;
    addbtn.value = true;
    toast.success("Todo  Edited"),
    {
  autoClose: 1000,
 
  };
  
  newTodoContent.value = "";


};
</script>
<style scoped>
.todo {
  max-width: 70%;
  padding: 20px;
  margin: 0 auto;
}
.search {
  width: 87%;
}
.edit {
  padding: 0.75rem 1rem;
}
.todo-field {
  border: none;
  outline: none;
}
.card-content {
  text-align: start;
}
.form-btn{
  border-radius: 0 10px 10px 0 !important;
}
</style>
