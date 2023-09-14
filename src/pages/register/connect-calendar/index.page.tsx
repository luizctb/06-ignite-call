import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = Boolean(router.query.error)

  const isSignedIn = session.status === 'authenticated'
  const isNotReadyToContinue = !isSignedIn

  async function handleGoogleSignIn() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>

        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size={'sm'} disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button
              type="button"
              variant={'secondary'}
              size={'sm'}
              onClick={handleGoogleSignIn}
            >
              Connect
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size={'sm'}>
            Fail to connect with Google Calendar, please verify if you have the
            correct permissions.
          </AuthError>
        )}

        <Button
          type="button"
          onClick={handleNavigateToNextStep}
          disabled={isNotReadyToContinue}
        >
          Next Step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
