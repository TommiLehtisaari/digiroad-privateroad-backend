import { NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  associationName: Yup.string().min(3).max(100).required(),
  municipality: Yup.string().min(3).max(100).required(),
  MMLIDCode: Yup.string().max(20),
  reporter: Yup.string().required().min(3).max(100),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .required(),
  email: Yup.string().max(100).email(),
  relationToAssociation: Yup.string().max(250),
  roads: Yup.array()
    .min(1)
    .required()
    .of(
      Yup.object().shape({
        roadName: Yup.string().min(3).max(100).required(),
        reportType: Yup.string()
          .required()
          .matches(/(REPORT_CHANGES|CORRECT|NO_RESTRICTIONS)/),
        speedLimit: Yup.string(),
        weightLimit: Yup.object().shape({
          maxVehicleMass: Yup.string(),
          extraRoadSigns: Yup.string(),
        }),
        roadThaw: Yup.object().shape({
          isRecurrent: Yup.boolean(),
          weightLimit: Yup.string(),
          startMonth: Yup.string().matches(
            /(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/
          ),
          startTiming: Yup.string().matches(/(BEGINING|MIDDLE|END)/),
          endMonth: Yup.string().matches(
            /(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/
          ),
          endTiming: Yup.string().matches(/(BEGINING|MIDDLE|END)/),
        }),
        vehicleRestriction: Yup.object().shape({
          restrictionType: Yup.string().max(250),
          extraRoadSigns: Yup.string().max(250),
        }),
        roadBarrier: Yup.string().matches(
          /(OPEN_CONNECTION|CLOSED_CONNECTION|NO_BARRIER)/
        ),
        mapURL: Yup.string().max(500),
        otherInfo: Yup.string().max(3000),
      })
    ),
})

const middleware = (req: Request, res: Response, next: NextFunction) => {
  schema
    .validate(req.body)
    .then(() => {
      next()
    })
    .catch((error) => {
      return res.status(404).send({ message: error.message })
    })
}

export default middleware
