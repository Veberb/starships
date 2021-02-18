import * as Yup from 'yup'

export const checkMegaLightSpeed = Yup.object().shape({
  megaLight: Yup.number()
    .required('Field is required')
    .min(1, 'Min Mega light is 1')
})
