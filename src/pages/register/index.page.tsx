import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters',
    })
    .max(20, {
      message: 'Username must be at most 20 characters',
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Username can only contain letters and dashes',
    })
    .transform((value) => value.toLowerCase()),

  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters',
    })
    .max(20, {
      message: 'Name must be at most 20 characters',
    }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        return alert(error.response.data.message)
      }

      console.log(error)
    }
  }

  useEffect(() => {
    if (router.query?.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as={'form'} onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size={'sm'}>Username</Text>
          <TextInput
            prefix="call.me/"
            placeholder="username"
            {...register('username')}
          />
          {errors.username && (
            <FormError size={'sm'}>{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size={'sm'}>Full Name</Text>
          <TextInput placeholder="your-name" {...register('name')} />
          {errors.name && (
            <FormError size={'sm'}>{errors.name.message}</FormError>
          )}
        </label>

        <Button disabled={isSubmitting}>
          Next Step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
