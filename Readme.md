---
theme: white
transition: slide
---

# React & TypeScript

Tipps & Tricks

---

## Why?

_(... am I standing in front of you?)_

- TypeScript is a common topic ✨
- React is very popular 🤷‍♂️
- Many ways, choices and problems 😳

---

## Today

- Start with a simple project 🔰
- Look at a few common concepts
- Improve little by little 🚀
- Learn along the way 🧑‍🎓

---

## Typedy Typedy

_Choose your level of typescript._

1. Just make your life easier
2. Make team life easier
3. Make code safer
4. Typed all the way

---

## Just make your life easier

_Get more docs._

```sh
$ npm install \
          @types/react \
          @types/react-dom \
          --save-dev
```

---

## Mixing tsx & jsx

---

## Use .d.ts

_Use `.jsx` with `.tsx`_

---

## Easy renaming

No: "`export default`"

---

## Stuck at the basics

- `import React from 'react'`
- `import * as React from 'react'`
- _tsconfig.json_
    ```json
    {
      "compilerOptions": {
        "jsx": "react-jsx"
      }
    }
    ```

---

### More tsconfig shenanigans

---

_tsconfig.json_
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "target": "ES2020",
    "lib": ["DOM", "ES2020"]
  }
}
```

---

_tsconfig.json_
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "target": "ES2020",
    "lib": ["DOM", "ES2020"],
    "moduleResolution": "NodeNext"
  }
}
```

---

## Props LVL 1

_define the props_

```typescript
export const Main = ({ value }: { value: string }) =>
  <div className="main">{value}</div>
```

---

## Props LVL 2

_extract to an interface_

```typescript
interface MainProps {
  value: string
}
export const Main = ({ value }: MainProps) => 
  <div className="main">{value}</div>
```

---

## Props LVL 3

_export it!_

```typescript
export interface MainProps {
  value: string
}
export const Main = ({ value }: MainProps) => 
  <div className="main">{value}</div>
```

---

## Props LVL 4

_Is it optional? Make it optional!_

```typescript
interface MainProps {
  value?: string
}
export const Main = ({ value }: MainProps) => 
  <div className="main">{value}</div>
```

---

## Props LVL 5

_Pass other properties as well!_

```typescript
type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement,
>;

export interface MainProps extends DivProps {
  value?: string
}
export const Main = (props: MainProps) => {
  const { value, ...rest } = props
  return <div className="main" {...rest}>{value}<div>
}
```

---

## Props LVL 6

_merge instead of override_

```sh
$ npm install classnames --save
```

---

## Props LVL 6 (2)

_components/Main.tsx_
```typescript
import classNames from 'classnames'

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement,
>;

export interface MainProps extends DivProps {
  value?: string
}
export const Main = (props: MainProps) => {
  const { value, className, ...rest } = props
  return <div
    className={classNames('main', className)}
    {...rest}
  >{value}<div>
}
```

---

## Props LVL 7

```typescript
import { forwardRef } from 'react'

export const Main = forwardRef((props: MainProps, ref) => {
  const { value, className, ...rest}
  return <div
    ref={ref}
    className={classNames('main', className)}
    {...rest}
  >{value}</div>
})
```

---

## Props LVL 7 (2)

```typescript
import { forwardRef } from 'react'

export const Main = forwardRef<HTMLDivElement>(
  (props: MainProps, ref) => {
    const { value, className, ...rest}
    return <div
      ref={ref}
      className={classNames('main', className)}
      {...rest}
    >{value}</div>
  }
)
```


---

## Child LVL 1

```typescript
export interface MainProps {
  children: string
}
export const Main = ({ children }: MainProps) => {
  return <div className='main'>{children}<div>
}
```

---

## Child LVL 2

```typescript
export interface MainProps {
  children: string | string[]
}
export const Main = ({ children }: MainProps) => {
  return <div className='main'>{children}<div>
}
```

---

## Child LVL 3

_types.d.ts_
```typescript
export type OneOrMany <T> = T | T[]
```

_component/Main.tsx_
```typescript
import type { OneOrMany } from '../types.d.ts'

export interface MainProps {
  children: OneOrMany<string>
}
export const Main = ({ children }: MainProps) => {
  return <div className='main'>{children}<div>
}
```

---

## Child LVL 4

_types.d.ts_
```typescript
export type OneOrMany <T> = T | T[]
```

_component/Main.tsx_
```typescript
import type { OneOrMany } from '../types.d.ts'
import { Children } from 'react'

export interface MainProps {
  children: OneOrMany<string>
}
export const Main = ({ children }: MainProps) => {
  return <div className='main'>{
    Children(children).join('')
  }<div>
}
```

---

## Team: keep TS version

```bash
$ npm install \
          typescript \
          --save-dev
```

---

## Use TS version in VSCode

_Easy to miss!_

- (in ts file) `Cmd` + `P`
- "`> TypeScript: Select TypeScript Version...`"
- "`Use Workspace Version`"

---

## TS Version in settings

_.vscode/settings.json_
```json
{
  "typescript.tsdk": "./node_modules/typescript/lib"
}
```

---

## Team: use linting

😜

---

## Type your data

```typescript
interface Project {
  id: string,
  name: string,
  data: any,
}

export const ProjectDisplay = ({ project }: ProjectDisplayProps) => {
  return <div className="project-display">
  
  </div>
}
```

---

## Type what you Receive!

(**bad**, but a good start)

```typescript
import { useEffect, useState } from 'react'

export const Events = () => {
  const [state, setState] = useState<any>()
  useEffect(
    () => {
      fetch('https://owddm.com/public/events.json')
        .then(res => res.json())
        .then(data => setState({
          data,
          success: true
        }))
    },
    []
  )
  return <></>
}
```

---

## Make our life easier

- `npm i swr`

---

## Make our life easier (2)

_util/fetchJSON.ts_
```typescript
async function fetchJSON(url: string) {
  return await (await fetch(url)).json()
}
```

_component/Events.tsx_
```typescript
import useSWR from 'swr'

export const Events = () => {
  const data = useSWR(
    'https://owddm.com/public/events.json',
    async url => await fetchJSON(url)
  )
  return <ul className="events">{
    data.data?.venues.map(venue => 
      <li key={venue.id}>{venue.name}</li>
    )
  }</ul>
}
```

---

## Make our life easier (2)

_util/fetchJSON.ts_
```typescript
async function fetchJSON(url: string) {
  return await (await fetch(url)).json()
}
```

_component/Events.tsx_
```typescript
import useSWR from 'swr'

export const Events = () => {
  const data = useSWR(
    'https://owddm.com/public/events.json',
    async url => await fetchJSON(url)
  )
  return <ul className="events">{
    data.data?.venues.map(venue => 
      <li key={venue.id}>{venue.name}</li>
    )
  }</ul>
}
```
