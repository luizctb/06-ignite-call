import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput, Text } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
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
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as={'form'} onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size={'sm'}
          prefix={'call.me/'}
          placeholder="your-username"
          {...register('username')}
        />
        <Button size={'sm'} type="submit" disabled={isSubmitting}>
          Username
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text>
          {errors.username ? errors.username.message : 'Type your username'}
        </Text>
      </FormAnnotation>
    </>
  )
}
