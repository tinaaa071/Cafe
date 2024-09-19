<template>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Get the router instance
const router = useRouter();

// Redirect to /404 when an invalid route is accessed
router.replace('/404');
</script>
  