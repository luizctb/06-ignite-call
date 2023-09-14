import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import previewImg from '../../assets/preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={'4xl'}>Easy scheduling</Heading>
        <Text size={'lg'}>
          Connect your calendar and allow people to schedule appointments during
          your free time
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImg}
          height={400}
          quality={100}
          priority
          alt="calendar"
        />
      </Preview>
    </Container>
  )
}
