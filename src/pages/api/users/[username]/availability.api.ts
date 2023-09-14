import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  // /api/users/libero/availability?date=2021-01-01
  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'date is required' })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(404).json({ message: 'user not found' })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.status(200).json({ availability: [] })
  }

  // TimeInterval X Scheduling
  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  // o user NÃO selecionou um horário para o dia da semana
  if (!userAvailability) {
    return res.status(200).json({ availability: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  // os agendamentos são realizados em hora em hora
  const startHour = time_start_in_minutes / 60 // 10
  const endHour = time_end_in_minutes / 60 // 18

  // [ 10, 11, 12, 13, 14, 15, 16, 17 ]
  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, index) => {
      return startHour + index
    },
  )

  return res.json({ possibleTimes })
}
