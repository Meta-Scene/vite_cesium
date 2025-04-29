<template>
<div>
{{abc}}
</div>
</template>

<script setup>
import { inject } from 'vue';
const abc=inject('abc')
</script>

<style>
</style>