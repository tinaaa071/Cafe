<template>
    <Navbar :cartItems="cartItems" @toggle-cart="toggleCart" />
    <div class="container p-4 pt-32 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">User Profile</h1>
  
      <!-- Profile Information Section -->
      <section class="mb-8">
        <h2 class="mb-2 text-xl font-semibold">Profile Information</h2>
        <form @submit.prevent="saveProfile">
          <div class="mb-4">
            <label for="account" class="block text-sm font-medium text-gray-700">Account</label>
            <!-- Display UID here -->
            <input v-model="uid" type="text" id="account" class="block w-full px-4 py-3 text-gray-500 bg-gray-200 border-gray-100 rounded-md disabled:opacity-50 disabled:pointer-events-none" disabled />
          </div>
          <div class="mb-4">
            <label for="displayName" class="block text-sm font-medium text-gray-700">Display Name</label>
            <input v-model="displayName" type="text" id="displayName" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" type="email" id="email" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm" required />
          </div>
          <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-md">Save Profile</button>
        </form>
      </section>
  
      <!-- Change Password Section -->
      <section class="mb-8">
        <h2 class="mb-2 text-xl font-semibold">Change Password</h2>
        <form @submit.prevent="changePassword">
          <div class="mb-4">
            <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
            <input v-model="currentPassword" type="password" id="currentPassword" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div class="mb-4">
            <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
            <input v-model="newPassword" type="password" id="newPassword" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm" required />
          </div>
          <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-md">Change Password</button>
          <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>
        </form>
      </section>
  
      <!-- Modals -->
      <Modal :show="showProfileModal" @close="showProfileModal = false">
        <div class="p-4 bg-white rounded-lg">
          <h2 class="text-lg font-semibold">Profile Saved</h2>
          <p class="mt-2">Your profile information has been saved successfully!</p>
        </div>
      </Modal>
  
      <Modal :show="showPasswordModal" @close="showPasswordModal = false">
        <div class="p-4 bg-white rounded-lg">
          <h2 class="text-lg font-semibold">Success</h2>
          <p class="mt-2">Your password has been updated successfully!</p>
        </div>
      </Modal>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { auth } from '../firebaseConfig';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

// Reactive states
const displayName = ref(localStorage.getItem('displayName') || '');
const email = ref(localStorage.getItem('email') || '');
const currentPassword = ref('');
const newPassword = ref('');
const errorMessage = ref('');
const showProfileModal = ref(false);
const showPasswordModal = ref(false);

// Reactive UID
const uid = ref('');

// Function to initialize UID
const initializeUid = () => {
  const user = auth.currentUser;
  if (user) {
    uid.value = user.email || '';
  } else {
    uid.value = ''; // Handle case where user is not logged in
  }
};

// Set up onAuthStateChanged listener
onMounted(() => {
  initializeUid();
  const unsubscribe = auth.onAuthStateChanged(user => {
    uid.value = user?.email || '';
  });
  
  // Clean up listener when component is unmounted
  return () => unsubscribe();
});

// Save profile information
const saveProfile = async () => {
  try {
    localStorage.setItem('displayName', displayName.value);
    localStorage.setItem('email', email.value);

    showProfileModal.value = true;
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Error saving profile: ' + error.message;
  }
};

// Change password
const changePassword = async () => {
  const user = auth.currentUser;

  if (user) {
    const credential = EmailAuthProvider.credential(user.email, currentPassword.value);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword.value);
      showPasswordModal.value = true;
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = 'Error updating password: ' + error.message;
    }
  } else {
    errorMessage.value = 'User not authenticated.';
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
  