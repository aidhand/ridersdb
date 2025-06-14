<script setup lang="ts">
import { ref } from "vue";
import type { SelectUser } from "../../../../packages/db/shared/types/tables";
import { users } from "../../../../packages/db/shared/utils/tables";
const usersTable = users;

const db = useDb();

const userEmail = ref("");
const userName = ref("");

const newUserStatus = ref<"idle" | "pending" | "success" | "error">("idle");
const newUserResult = ref<SelectUser | null>(null);
const newUserError = ref<string | null>(null);

const createUser = async () => {
  newUserStatus.value = "pending";

  try {
    const [user] = await db
      .insert(usersTable)
      .values({
        email: userEmail.value,
        firstName: userName.value,
      })
      .returning();

    if (user) {
      newUserStatus.value = "success";
      newUserResult.value = user;
    } else {
      newUserStatus.value = "error";
      newUserError.value = "User creation failed.";
    }
  } catch (e) {
    newUserStatus.value = "error";
    newUserError.value = e instanceof Error ? e.message : String(e);
  } finally {
    userEmail.value = "";
    userName.value = "";
  }
};
// Meta tags for SEO
useSeoMeta({
  title: "Test",
  description:
    "Sign in to your RidersDB account to manage your motorcycle gear collection, watchlist, and preferences.",
});
</script>

<template>
  <div>
    <div
      v-if="newUserStatus === 'success'"
      class="mb-4"
    >
      <p>User created successfully!</p>
      <br />
      <pre>{{ newUserResult }}</pre>
    </div>

    <div
      v-if="newUserStatus === 'error'"
      class="mb-4"
    >
      <p>User creation failed.</p>
      <br />
      <pre>{{ newUserError }}</pre>
    </div>

    <form
      :disabled="newUserStatus === 'pending'"
      @submit.prevent="createUser"
    >
      <UFormField
        label="Email Address"
        required
      >
        <UInput
          v-model="userEmail"
          type="email"
          placeholder="Enter your email address"
          icon="i-tabler-mail"
          size="lg"
        />
      </UFormField>

      <UFormField
        label="Name"
        required
      >
        <UInput
          v-model="userName"
          type="text"
          placeholder="Enter your name"
          icon="i-tabler-user"
          size="lg"
        />
      </UFormField>

      <UButton
        type="submit"
        icon="i-tabler-login"
        color="primary"
        variant="solid"
        size="lg"
        class="w-64 justify-center"
      >
        Sign In
      </UButton>
    </form>
  </div>
</template>
