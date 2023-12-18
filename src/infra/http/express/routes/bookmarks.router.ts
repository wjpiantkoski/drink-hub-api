import {Request, Response, Router} from 'express'
import CreateBookmarkUsecaseFactory from '../../../../modules/beverage/usecases/create-bookmark/create-bookmark.usecase.factory'
import RemoveBookmarkUsecaseFactory from '../../../../modules/beverage/usecases/remove-bookmark/remove-bookmark.usecase.factory'

export default class BookmarksRouter {
  private _router = Router()

  constructor() {
    this.routes()
  }

  get router(): Router {
    return this._router
  }

  private routes(): void {
    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const createBookmark = CreateBookmarkUsecaseFactory.create()
        const {status, data} = await createBookmark.execute(req.body)
        res.status(status).send(data)
      } catch (err) {
        console.error(err)
        res.status(500).send()
      }
    })

    this.router.delete('/:id', async (req: Request, res: Response) => {
      try {
        const removeBookmark = RemoveBookmarkUsecaseFactory.create()

        const {status, data} = await removeBookmark.execute({
          bookmarkId: req.params.id
        })

        res.status(status).send(data)
      } catch (err) {
        console.error(err)
        res.status(500).send()
      }
    })
  }
}