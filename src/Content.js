import { memo } from "react";
import { useState } from 'react'


function Content({ onIncrease }) {

  console.log('Re-render')
  return (
    <>
      <h2>HELLO Anh em</h2>
      <button onClick={onIncrease}>Click me!</button>
    </>
  )
}

export default memo(Content)