// File: src/components/overview.tsx

import React from 'react'
import League_card from './League_card'

type Props = {}

export default function overview({}: Props) {
  return (
    <div>overview

        <div>Hier stehen alle Ligen in Karten form</div>
        <div className='flex gap-2'>        
        <League_card />
        <League_card />
        <League_card />
        <League_card />
        <League_card />
        <League_card />
        <League_card />
        <League_card /></div>


    </div>

  )
}