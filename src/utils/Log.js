import { PRODUCTION } from '@/constants'

const Log = {
  dev: function () {
    if (!PRODUCTION) console.log(...arguments)
  }
}

export default Log