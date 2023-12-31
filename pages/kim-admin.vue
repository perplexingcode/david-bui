<template>
  <div>
    <!-- Your template code here -->
  </div>
</template>

<script setup>
// Redirect to /projects/kim-admin
const redirect = () => {
  const router = useRouter();
  router.push('/projects/kim-admin');
};

// Call the redirect function when the component is mounted
onMounted(() => {
  redirect();
});
</script>
