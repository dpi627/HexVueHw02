<template>
  <div>
    <input type="text" v-model="newName" />
    {{ newName }}
    <input type="number" v-model.number="newNumber" />
    {{ newNumber }}
    <button type="button" @click="addItem">Add</button>
  </div>
  <ul>
    <li v-for="(item, key) in items" :key="item.name">
      {{ key + 1 }}. {{ item.name }} ({{ item.number }})
      <button tpye="button" @click="removeItem(key)">Remove</button>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';

const newName = ref('');
const newNumber = ref(0);

const addItem = () => {
  items.value.push({
    name: newName.value,
    number: newNumber.value
  });
}

const removeItem = (key) => {
  items.value.splice(key, 1);
}

const items = ref([
  { name: 'Item 1', number: 1 },
  { name: 'Item 2', number: 2 },
  { name: 'Item 3', number: 3 }
]);
</script>