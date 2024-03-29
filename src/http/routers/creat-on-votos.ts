import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../../lip/prisma'
import { randomUUID } from 'node:crypto'
import { dayInSeconds } from '../utils/timeInSeconds'
import { redis } from '../../lip/redis'
import { voting } from '../utils/voting-pub-sub'

export async function creatVoto(app: FastifyInstance) {
  app.post('/polls/:pollId/voto', async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid()
    })

    const voteOnPollParams = z.object({
      pollId: z.string().uuid()
    })

    const { pollOptionId } = voteOnPollBody.parse(request.body)
    const { pollId } = voteOnPollParams.parse(request.params)

    let { sessionId } = request.cookies

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.voto.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId
          }
        }
      })

      if (
        userPreviousVoteOnPoll &&
        userPreviousVoteOnPoll.pollOptionId != pollOptionId
      ) {
        await prisma.voto.delete({
          where: {
            id: userPreviousVoteOnPoll.id
          }
        })

        const votos = await redis.zincrby(
          pollId,
          -1,
          userPreviousVoteOnPoll.pollOptionId
        )

        voting.publish(pollId, {
          pollOptionId: userPreviousVoteOnPoll.pollOptionId,
          voto: Number(votos)
        })
      } else if (userPreviousVoteOnPoll) {
        return reply
          .status(400)
          .send({ message: 'you already voted on this poll.' })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: dayInSeconds(30),
        signed: true,
        httpOnly: true
      })
    }

    await prisma.voto.create({
      data: {
        sessionId,
        pollId,
        pollOptionId
      }
    })

    const votos = await redis.zincrby(pollId, 1, pollOptionId)

    voting.publish(pollId, {
      pollOptionId,
      voto: Number(votos)
    })

    return reply.status(201).send()
  })
}
