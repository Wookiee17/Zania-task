import { http, HttpResponse } from 'msw'
import { data } from '../data'

export const handlers = [

  http.get('/docs', () => {

    const docs = localStorage.getItem('zania_docs')

    if (docs === null) {
      const initDocs =  data
      localStorage.setItem('zania_docs', JSON.stringify(initDocs))
      return HttpResponse.json(initDocs)
    }

    return HttpResponse.json(JSON.parse(docs))
  }),

  http.put('/update-docs',async ({request}:any) => {

    const { docs } = await request.json()

    localStorage.setItem('zania_docs', JSON.stringify(docs))

    return HttpResponse.json(docs)
  }),
  
]