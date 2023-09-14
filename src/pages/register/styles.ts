import { Box, Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 572, // 540 + 16px (padding) + 16px (padding)
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('header', {
  padding: '0 $6',

  [`> ${Heading} &`]: {
    lineHeight: '$base',
  },

  [`> ${Text} &`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Form = styled(Box, {
  marginTop: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
