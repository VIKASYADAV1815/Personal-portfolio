"use client"

import { SaveButton } from "./coffee"

export function coffee() {
  return (
    <SaveButton 
      text={{
        idle: "Save me, please!",
        saving: "Can you buy me a Coffee??",
        saved: "Saved! Woohoo!"
      }}
    />
  )
}