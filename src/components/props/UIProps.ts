import {forms} from './render'

export type UIProps = {
  type: keyof typeof forms,
  label: string
}