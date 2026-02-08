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
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <p-select id="type" name="type" :options="['LSAP', 'Локальная']" class="w-40" />
          <label for="type">Тип записи</label>
        </ifta-label>
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <InputText
            name="login"
            type="text"
            placeholder="Значение"
            :formControl="{ validateOnBlur: true }"
            @blur="console.log('blur')"
          />
          <label for="login">Логин</label>
        </ifta-label>

        <Message v-if="$form.login?.invalid" severity="error" size="small" variant="simple">
          {{ $form.login.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <password
            id="password"
            name="password"
            type="password"
            placeholder="Значение"
            :feedback="false"
          />
          <label for="password">Пароль</label>
        </ifta-label>

        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          {{ $form.password.error?.message }}
        </Message>
      </div>
      <p-button type="submit">submit</p-button>
      <div>
        <pre> form: {{ $form }}</pre>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Profile } from '@/models'
import type { FormSubmitEvent } from '@primevue/forms/form'
import { useToast } from 'primevue/usetoast'

interface ProfileForm extends Omit<Profile, 'password' | 'tags'> {
  password: string
  tags: string
}

const toast = useToast()

const initialValues = reactive<ProfileForm>({
  tags: '',
  type: 'Локальная',
  login: '',
  password: '',
})

const data = reactive<ProfileForm>({
  tags: '',
  type: 'Локальная',
  login: '',
  password: '',
})

const resolver = ({ values }: { values: ProfileForm }) => {
  console.log('resolver', values)
  const errors: Record<string, { message: string }[]> = {}

  if (!values.password) {
    errors.password = [{ message: 'Password is required.' }]
  }

  if (!values.login) {
    errors.login = [{ message: 'Login is required.' }]
  }

  console.log('errors', errors)
  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  }
}

const onFormSubmit = (e: FormSubmitEvent) => {
  console.log(e)
  if (e.valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
  }
}
</script>
