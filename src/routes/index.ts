import express, { Application } from 'express'
import privateRoadForm from './privateRoadForm'
import live from './live'

export const routes = (app: Application) => {
  app.use(express.json())
  app.use('/api/privateroad', privateRoadForm)
  app.use('/live', live)
}
