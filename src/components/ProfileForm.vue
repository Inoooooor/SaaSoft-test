<template>
  <div class="card flex">
    <Toast />

    <Form
      v-slot="$form"
      :initial-values="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex gap-4 bg-gray-200"
    >
      <div class="flex flex-col gap-1">
        <ifta-label>
          <InputText
            id="tags"
            name="tags"
            type="text"
            placeholder="XXX;MMM;YYY;III"
            :formControl="{ validateOnBlur: true }"
          />
          <label for="tags">Метки</label>
        </ifta-label>

        <Message v-if="$form.login?.invalid" severity="error" size="small" variant="simple">
          {{ $form.login.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <p-select
            id="profileType"
            name="profileType"
            :options="['LSAP', 'Локальная']"
            :formControl="{ validateOnValueUpdate: true }"
            class="w-40"
          />
          <label for="profileType">Тип записи</label>
        </ifta-label>

        <Message v-if="$form.login?.invalid" severity="error" size="small" variant="simple">{{
          $form.login.error?.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <InputText
            name="login"
            type="text"
            placeholder="Login"
            :formControl="{ validateOnBlur: true }"
          />
          <label for="login">Логин</label>
        </ifta-label>

        <Message v-if="$form.login?.invalid" severity="error" size="small" variant="simple">{{
          $form.login.error?.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <label for="password">Пароль</label>
          <InputText
            name="password"
            type="password"
            placeholder="Пароль"
            :formControl="{ validateOnBlur: true }"
          />
        </ifta-label>

        <Message v-if="$form.login?.invalid" severity="error" size="small" variant="simple">{{
          $form.login.error?.message
        }}</Message>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Profile } from '@/models'
import { useToast } from 'primevue/usetoast'

interface ProfileForm extends Omit<Profile, 'password'> {
  password: string
}

const toast = useToast()

const initialValues = reactive({
  login: '',
})

const resolver = ({ values }: { values: ProfileForm }) => {
  const errors: Record<string, { message: string }[]> = {}

  if (!values.login) {
    errors.login = [{ message: 'Login is required.' }]
  }

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  }
}

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
  }
}
</script>
