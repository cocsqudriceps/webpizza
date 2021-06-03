import { useCallback } from 'react'
import M from 'materialize-css'

export default () =>
  useCallback((text, color) => {
    if (M && text) {
      M.toast({ html: text, classes: color })
    }
  }, [])
