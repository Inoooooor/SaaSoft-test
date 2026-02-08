<template>
  <Form
    ref="formHtml"
    v-slot="$form"
    :initial-values="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex gap-1 bg-gray-200 w-200 justify-between"
    :validateOnBlur="true"
  >
    <div class="flex min-w-1/2 gap-1">
      <div class="flex flex-col gap-1 w-full">
        <ifta-label>
          <input-text
            class="w-full"
            id="tags"
            name="tags"
            type="text"
            placeholder="XXX;MMM;YYY;III"
            @blur="$formHtml?.submit()"
            @change=""
          />
          <label for="tags">Метки</label>
        </ifta-label>
      </div>
      <div class="flex flex-col gap-1 w-full">
        <ifta-label>
          <p-select
            class="w-full"
            id="type"
            name="type"
            :options="['LDAP', 'Локальная']"
            @change="$form.password.value = $form.type.value === 'LDAP' ? '' : $form.password.value"
          />
          <label for="type">Тип записи</label>
        </ifta-label>
      </div>
    </div>
    <div class="flex flex-col gap-1 w-full">
      <ifta-label>
        <input-text
          class="w-full"
          name="login"
          type="text"
          placeholder="Значение"
          @blur="$formHtml?.submit()"
        />
        <label for="login">Логин</label>
      </ifta-label>

      <Message v-if="$form.login?.invalid" severity="error" size="small" variant="simple">
        {{ $form.login.error?.message }}
      </Message>
    </div>
    <div v-if="$form?.type?.value === 'Локальная'" class="flex flex-col gap-1 w-full">
      <ifta-label>
        <password
          class="w-full"
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
    <!-- <div>
        <pre> form: {{ $form }}</pre>
      </div> -->
  </Form>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import type { Profile } from '@/models'
import type { FormSubmitEvent } from '@primevue/forms/form'

interface ProfileForm extends Omit<Profile, 'password' | 'tags'> {
  password: string
  tags: string
}

const emit = defineEmits<{
  (e: 'update', value: Profile): void
}>()

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
  const errors: Record<string, { message: string }[]> = {}

  if (values.type === 'Локальная' && !values.password) {
    errors.password = [{ message: 'Пароль обязателен.' }]
  }

  if (!values.login) {
    errors.login = [{ message: 'Логин обязателен.' }]
  }

  return { values, errors }
}

const onFormSubmit = (e: FormSubmitEvent) => {
  console.log('raw submit')

  if (!e.valid) return

  console.log('%c success submit', 'color: green')
}

const handleProfileTypeChange = (value: string) => {
  if (value === 'LDAP') {
    data.type = 'Локальная'
  }
}
</script>
