import axios from 'axios'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: typeof axios
  }
}