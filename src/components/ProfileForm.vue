<template>
  <div class="card flex">
    <Form
      ref="formHtml"
      v-slot="$form"
      :initial-values="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex gap-4 bg-gray-200"
      :validateOnBlur="true"
    >
      <div class="flex flex-col gap-1">
        <ifta-label>
          <input-text
            id="tags"
            name="tags"
            type="text"
            placeholder="XXX;MMM;YYY;III"
            @blur="$formHtml?.submit()"
          />
          <label for="tags">Метки</label>
        </ifta-label>
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <p-select
            id="type"
            name="type"
            :options="['LSAP', 'Локальная']"
            class="w-40"
            @blur="$formHtml?.submit()"
          />
          <label for="type">Тип записи</label>
        </ifta-label>
      </div>
      <div class="flex flex-col gap-1">
        <ifta-label>
          <input-text name="login" type="text" placeholder="Значение" @blur="$formHtml?.submit()" />
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
            @blur="$formHtml?.submit()"
          />
          <label for="password">Пароль</label>
        </ifta-label>

        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          {{ $form.password.error?.message }}
        </Message>
      </div>
      <div>
        <pre> form: {{ $form }}</pre>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import type { Profile } from '@/models'
import type { FormSubmitEvent } from '@primevue/forms/form'

interface ProfileForm extends Omit<Profile, 'password' | 'tags'> {
  password: string
  tags: string
}

const $formHtml = useTemplateRef<HTMLFormElement>('formHtml')

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
  // console.log('resolver', values)
  const errors: Record<string, { message: string }[]> = {}

  if (!values.password) {
    errors.password = [{ message: 'Пароль обязателен.' }]
  }

  if (!values.login) {
    errors.login = [{ message: 'Логин обязателен.' }]
  }

  // console.log('errors', errors)
  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  }
}

const onFormSubmit = (e: FormSubmitEvent) => {
  console.log('raw submit')
  if (e.valid) {
    console.log('%c success submit', 'color: green')
  }
}
</script>
