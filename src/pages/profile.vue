<template>
  <div class="h-screen font-bold bg-B4 sm:pb-10 dark:bg-stone-900 text-stone-900 dark:text-white">
    <Layout>
      <template #content>
        <div class="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-2">      
          <!-- 個人資料 -->
          <section class="mb-8">
            <h2 class="pb-4 text-xl font-bold sm:mb-6 sm:text-3xl">
              個人資料
            </h2>
            <form @submit.prevent="saveProfile">
              <!-- 帳號 -->
              <div class="mb-4">
                <label for="account" class="block mb-2">
                  帳號：
                </label>
                <!-- Display UID here -->
                <input v-model="uid" type="text" id="account" class="input dark:bg-stone-700" disabled />
              </div>
              <!-- 姓名 -->
              <div class="mb-4">
                <label for="displayName" class="block mb-2">
                  姓名：
                </label>
                <input v-model="displayName" type="text" id="displayName" class="input" required />
              </div>
              <!-- 電話 -->
              <div class="mb-4">
                <label for="phone" class="block mb-2">
                  電話：
                </label>
                <input v-model="phone" type="tel" id="phone" class="input" required />
              </div>
              <!-- 電子郵件 -->
              <div class="mb-6 md:mb-10">
                <label for="email" class="block mb-2">
                  電子郵件：
                </label>
                <input v-model="email" type="email" id="email" class="input" required />
              </div>
              <!-- 按鈕 -->
              <button type="submit" class="button-main">
                更新資料
              </button>
            </form>
          </section>
      
          <!-- 修改密碼 -->
          <section class="mb-8">
            <h2 class="pb-4 text-xl font-bold sm:mb-6 sm:text-3xl">
              修改密碼
            </h2>
            <form @submit.prevent="changePassword">
              <!-- 現有密碼 -->
              <div class="mb-4">
                <label for="currentPassword" class="block mb-2">
                  現有密碼：
                </label>
                <input v-model="currentPassword" type="password" id="currentPassword" class="input" required />
              </div>
              <!-- 更新密碼 -->
              <div class="mb-6 md:mb-10">
                <label for="newPassword" class="block mb-2">
                  更新密碼：
                </label>
                <input v-model="newPassword" type="password" id="newPassword" class="input" required />
              </div>
              <!-- 按鈕 -->
              <button type="submit" class="button-main">
                變更密碼
              </button>
              <!-- 錯誤資訊 -->
              <p v-if="errorMessage" class="mt-4 font-bold text-red-500">
                {{ errorMessage }}
              </p>
            </form>
          </section>
      
          <!-- 更新資訊 Modal -->
          <Modal :show="showProfileModal" @close="showProfileModal = false">
            <div class="p-5 text-base font-bold text-center md:text-xl">
              <img src="https://i.pinimg.com/control/564x/b5/b4/f9/b5b4f9cad18a8a787c3dd9bd39fc2f5e.jpg" alt="" class="object-cover mb-4 border-2 aspect-video border-stone-900 md:mb-6">
              <h2 class="text-lg font-semibold">
                資料已更新
              </h2>
            </div>
          </Modal>
      
          <!-- 成功變更密碼 Modal -->
          <Modal :show="showPasswordModal" @close="showPasswordModal = false">
            <div class="p-5 text-base font-bold text-center md:text-xl">
              <img src="https://i.pinimg.com/control/564x/b5/b4/f9/b5b4f9cad18a8a787c3dd9bd39fc2f5e.jpg" alt="" class="object-cover mb-4 border-2 aspect-video border-stone-900 md:mb-6">
              <h2 class="text-lg font-semibold">
                密碼已變更
              </h2>
            </div>
          </Modal>
        </div>
      </template>
    </Layout>
  </div>
    
    
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { auth } from '../firebaseConfig';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

// Reactive states
const displayName = ref(localStorage.getItem('displayName') || '');
const phone = ref(localStorage.getItem('phone') || '');
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
    localStorage.setItem('phone', phone.value);
    localStorage.setItem('email', email.value);

    showProfileModal.value = true;
    errorMessage.value = '';
    // Set a timeout to close the modal after 2 seconds
    setTimeout(() => {
      showProfileModal.value = false;
    }, 2000); // 2 seconds
  } catch (error) {
    errorMessage.value = `無法儲存資料：${error.message}`;
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
      // Set a timeout to close the modal after 2 seconds
      setTimeout(() => {
        showPasswordModal.value = false;
      }, 2000); // 2 seconds
    } catch (error) {
      errorMessage.value = `密碼更新失敗，請再次檢查`;
    }
  } else {
    errorMessage.value = '使用者未登入。';
  }
};
</script>
